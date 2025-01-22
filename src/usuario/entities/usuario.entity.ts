import {
    IsDate,
    isDate,
    IsEmail,
    IsNotEmpty,
    MinLength,
  } from 'class-validator';
  import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
  import { Transform, TransformFnParams, Type } from 'class-transformer';
  
  @Entity({ name: 'tb_usuarios' })
  export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;
  
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    nome_completo: string;
  
    @IsEmail()
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    usuario: string;
  
    @MinLength(8)
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    senha: string;
  
    @Column({ length: 5000 })
    foto: string;

    @Column({ length: 50})
    @IsNotEmpty()
    cpf: string

    @Column({length: 30})
    @IsNotEmpty()
    numero_telefone: string


    @Column()
    @IsDate()
    @Type(() => Date)
    data_nascimento: Date;


    @CreateDateColumn()
    criado_em: Date

    @UpdateDateColumn()
    atualizado_em: Date


   /* @OneToMany(() => Viagem, (viagem) => viagem.usuario)
    viagem: Viagem[]; */

  }