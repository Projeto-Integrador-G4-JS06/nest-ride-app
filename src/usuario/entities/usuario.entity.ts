import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  // OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Type } from 'class-transformer';
// import { Viagem } from '../../viagem/entities/viagem.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID do usuário (gerado automaticamente)' })
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty({ description: 'Nome completo do usuário' })
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, unique: true, nullable: false })
  @ApiProperty({ description: 'Endereço de e-mail do usuário' })
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty({ description: 'Senha do usuário (mínimo 8 caracteres)' })
  senha: string;

  @Column({ length: 5000, nullable: true })
  @ApiProperty({ description: 'URL da foto do usuário', required: false })
  foto?: string;

  @Column({ length: 14, nullable: false, unique: true })
  @IsNotEmpty()
  @ApiProperty({ description: 'CPF do usuário no formato XXX.XXX.XXX-XX' })
  cpf: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty({ description: 'Endereço completo do usuário' })
  endereco: string;

  @Column({ length: 14, nullable: false })
  @IsNotEmpty()
  @ApiProperty({ description: 'Número de telefone do usuário' })
  numero_telefone: string;

  @Column({ type: 'date', nullable: false })
  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Data de nascimento do usuário (YYYY-MM-DD)',
    format: 'date',
  })
  data_nascimento: Date;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty({ description: 'Tipo do usuário (ex: "driver", "user")' })
  tipo_usuario: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'Data de criação do registro' })
  criado_em: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Data da última atualização do registro' })
  atualizado_em: Date;

  // @OneToMany(() => Viagem, (viagem) => viagem.usuario)
  // @ApiProperty({ description: 'Lista de viagens associadas ao usuário' })
  // viagem: Viagem[];
}
