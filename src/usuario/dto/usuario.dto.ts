import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UsuarioDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Nome completo do usuário' })
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Endereço de e-mail do usuário' })
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  @ApiProperty({ description: 'Senha do usuário (mínimo 8 caracteres)' })
  senha: string;

  @IsString()
  @ApiPropertyOptional({ description: 'URL da foto do usuário' })
  foto?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'CPF do usuário no formato XXX.XXX.XXX-XX' })
  cpf: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Endereço completo do usuário' })
  endereco: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Número de telefone do usuário' })
  numero_telefone: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Data de nascimento no formato YYYY-MM-DD',
    format: 'date',
  })
  data_nascimento: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Tipo do usuário (ex: "driver", "user")' })
  tipo_usuario: string;
}
