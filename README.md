<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <b>Powered by NestJS</b>
</p>

---

# 📬 Portfolio Mailer API

Este proyecto es una REST API desarrollada con **NestJS** para gestionar el envío de correos desde el formulario de contacto de mi portafolio personal. Al enviar un mensaje, se notifica tanto al usuario como a mí, utilizando un template HTML personalizado.

---

## 🚀 Características

- ⚙️ **NestJS** como framework backend.
- 📧 **Nodemailer** para envío de correos.
- 🔐 **API Key** para autenticación.
- 📊 **Swagger** para documentación y pruebas del endpoint.
- ⏱️ **Throttle** para limitar el número de solicitudes.
- 🌐 **CORS** configurado para permitir solo orígenes definidos.

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/RichardOnate/portfolio_mailer.git
   cd portfolio_mailer
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```
   
3. Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:

```yaml

#Puerto y entorno
PORT= Puerto por el cual te comunicarás con la API (por defecto es el 3000)
NODE_ENV= Entorno de desarrollo o producción

# Configuración Nodemailer
MAIL_HOST= Servidor SMTP que utilizarás (Google, Microsoft, etc)
MAIL_PORT= Puerto TCP a utilizar(587, 465, etc)
MAIL_USER= Correo que utilizarás para enviar el mail
MAIL_DISPLAY= Correo que utilizarás para enviar el mail y que se mostrará al receptor
MAIL_PASSWORD= Contraseña para usar el correo (de aplicaciones en caso de Google, de acceso en caso de Microsoft, etc)

#API key
API_KEY= Define la API KEY

#Throttle
THROTTLE_TTL= Tiempo que mantendrás la solicitud
THROTTLE_LIMIT= Límite de solicitudes

# URLs permitidas para CORS (separadas por comas en producción)
CLIENT_URL= URL Front

```

4. Ejecuta el proyecto:

   ```bash
   # Modo desarrollo
   npm run start:dev

   # Modo producción
   npm run start:prod
   ```

---

## 🔗 Endpoints

Puedes probar el endpoint directamente desde la documentación Swagger disponible en:

```
http://localhost:3000/docs
```

### Enviar correo

**POST** `/api/mailing`

- **Authorization**: `Bearer <API_KEY>`
- **Content-Type**: `application/json`

#### Ejemplo de Body

```json
{
  "fullName": "Juan Pérez",
  "email": "juan@example.com",
  "subject": "Contacto vía formulario", 
  "message": "Hola, me interesa tu trabajo."
}
```

---


## 🐳 Dockerización

Este proyecto está preparado para ser desplegado en un contenedor Docker.

### Dockerfile

El `Dockerfile` usa una estrategia de build en múltiples etapas para optimizar la imagen final.

### Construcción de la imagen

```bash
docker build -t portfolio-mailer-api .
```

### Ejecución del contenedor

```bash
docker run -p 3000:3000 --env-file .env portfolio-mailer-api
```
> NOTA:
> Ten en cuenta los puertos definidos anteriormente.

---

## ⚙️ Docker Compose (opcional)

Puedes usar `docker-compose.yml` para levantar el proyecto fácilmente:

```yaml
services:
  portfolio-mailer-api:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: portfolio-mailer-api
    ports:
      - ${PORT:-3000}:${PORT:-3000}
    env_file:
      - .env
    restart: always
```

Para levantar los servicios:

```bash
docker-compose up --build
```

---

## 📁 Archivos útiles

- `.env` – Variables de entorno.
- `.dockerignore` – Archivos excluidos del build (sugerencia: incluye `node_modules`, `dist`, etc.).
- `Dockerfile` – Instrucciones para construir la imagen.
- `docker-compose.yml` – Orquestación de contenedores (opcional).

---

## ✅ Notas finales

- Asegúrate de mantener seguras tus credenciales.
- Para producción, considera usar servicios como [Render](https://render.com), [Railway](https://railway.app) o [Google Cloud Run](https://cloud.google.com/run).
