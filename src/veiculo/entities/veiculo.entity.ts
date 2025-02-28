import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Viagem } from '../../viagem/entities/viagem.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_veiculos' })
export class Veiculo {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 50, nullable: false })
  @ApiProperty()
  modelo: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 50, nullable: false })
  @ApiProperty()
  marca: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  @ApiProperty()
  ano: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 20, nullable: false })
  @ApiProperty()
  cor: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 50, nullable: false })
  @ApiProperty()
  tipo: string;

  @IsNotEmpty()
  @Column({ length: 5000, nullable: false })
  @ApiProperty()
  foto: string;

  // Baseado em ( ABC-1234 ) <- 8 Caracteres, 10 pra ter folga.
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 10, nullable: false })
  @ApiProperty()
  placa: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 50, nullable: false })
  @ApiProperty()
  tipo_combustivel: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 50, nullable: false })
  @ApiProperty()
  tipo_transmissao: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  @ApiProperty()
  capacidade: number;

  @IsNotEmpty()
  @Column({ nullable: false })
  @ApiProperty()
  num_assentos: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 1000, nullable: true })
  @ApiProperty()
  itens: string;

  @IsNotEmpty()
  @Column({ type: 'boolean', nullable: false, default: true })
  @ApiProperty()
  disponibilidade: boolean;

  @CreateDateColumn()
  @ApiProperty()
  criado_em: Date;

  @UpdateDateColumn()
  @ApiProperty()
  atualizado_em: Date;

  @OneToMany(() => Viagem, (viagem) => viagem.veiculo)
  @ApiProperty()
  viagem: Viagem[];
}
