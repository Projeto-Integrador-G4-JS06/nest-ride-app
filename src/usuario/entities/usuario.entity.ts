import {
    IsDate,
    isDate,
    IsEmail,
    IsNotEmpty,
    MinLength,
  } from 'class-validator';
  import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
  import { Transform, TransformFnParams, Type } from 'class-transformer';
import { Viagem } from '../../viagem/entities/viagem.entity';
  
  @Entity({ name: 'tb_usuarios' })
  export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;
  
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    nome: string;
  
    @IsEmail()
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    email: string;
  
    @MinLength(8)
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    senha: string;
  
    @Column({ length: 5000 })
    foto: string;

    @Column({ length: 14, nullable: false})
    @IsNotEmpty()
    cpf: string

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    endereco: string;

    @Column({length: 14, nullable: false})
    @IsNotEmpty()
    numero_telefone: string


    @Column()
    @IsDate()
    @Type(() => Date)
    data_nascimento: Date;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    tipo_usuario: string;


    @CreateDateColumn()
    criado_em: Date

    @UpdateDateColumn()
    atualizado_em: Date


    @OneToMany(() => Viagem, (viagem) => viagem.usuario)
    viagem: Viagem[]; 

  }