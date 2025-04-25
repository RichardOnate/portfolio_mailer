import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, Matches } from "class-validator";

export class CreateMailDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Nombre completo del usuario',
        default: 'John Doe',
      })
    fullName: string;
  
    @IsNotEmpty()
    @IsEmail()
    @Matches(/^(?!.@.@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/, { message: 'Email invalido' })
    @ApiProperty({
        description: 'Email del usuario',
        default: 'example@example.com',
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Asunto del mensaje',
        default: 'Contacto',
    })
    subject: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Mensaje del usuario',
        default: 'Esto es un mensaje de prueba',
    })
    message: string;
  
}
