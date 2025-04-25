# Etapa de construcción (builder)
# Usa una imagen base de Node.js para compilar la aplicación
FROM node:alpine AS builder  

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app  

# Copia los archivos de definición de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias de desarrollo sin ejecutar scripts post-install
RUN npm install --frozen-lockfile --ignore-scripts

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Compila la aplicación y luego instala solo las dependencias de producción
RUN npm run build && \
    npm install --production --frozen-lockfile --ignore-scripts

# ------------------------------------------------------------
# Etapa final (producción)
# Usa la misma imagen base de Node.js para mantener compatibilidad
FROM node:alpine AS production 

# Define el entorno como producción y puerto
ENV NODE_ENV=production 
ENV PORT=3000  

# Define el mismo directorio de trabajo
WORKDIR /app  

# Copia los archivos necesarios desde la etapa de build
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Expone el puerto 3000 para que pueda ser accedido desde fuera del contenedor
EXPOSE ${PORT}

# Comando por defecto que ejecuta la app NestJS compilada
CMD [ "node", "dist/main.js" ]
