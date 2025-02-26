import { IsDate, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Type } from 'class-transformer';
import { Viagem } from '../../viagem/entities/viagem.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  senha: string;

  @Column({ length: 5000 })
  @ApiProperty()
  foto: string;

  @Column({ length: 14, nullable: false })
  @IsNotEmpty()
  @ApiProperty()
  cpf: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  endereco: string;

  @Column({ length: 14, nullable: false })
  @IsNotEmpty()
  @ApiProperty()
  numero_telefone: string;

  @Column()
  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  data_nascimento: Date;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  tipo_usuario: string;

  @CreateDateColumn()
  @ApiProperty()
  criado_em: Date;

  @UpdateDateColumn()
  @ApiProperty()
  atualizado_em: Date;

  @ApiProperty()
  @OneToMany(() => Viagem, (viagem) => viagem.usuario)
  viagem: Viagem[];
}
