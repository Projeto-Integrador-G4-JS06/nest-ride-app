import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'tb_veiculos' })
export class Veiculo {
  @PrimaryGeneratedColumn()
  id: number;

  // ( Corolla, Civic, Corsa )
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 50, nullable: false })
  modelo: string;

  // ( Toyota, Honda, Chevrolet )
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 50, nullable: false })
  marca: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  ano: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 20, nullable: false })
  cor: string;

  // ( Sedan, Suv, Hatch )
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 50, nullable: false })
  tipo: string;

  @IsNotEmpty()
  @Column({ length: 5000, nullable: false })
  foto: string;
 

  // Baseado em ( ABC-1234 ) <- 8 Caracteres, 10 pra ter folga.
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({length: 10, nullable: false })
  placa: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  kilometragem: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({nullable: false })
  autonomia: number;

  @IsNotEmpty()
  @Column({nullable: false })
  capacidade: number;

  @IsNotEmpty()
  @Column({nullable: false })
  num_assentos: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({length: 1000, nullable: false })
  itens: string;

  @CreateDateColumn()
  criado_em: Date;

  @UpdateDateColumn()
  atualizado_em: Date;

//   @OneToMany(() => Viagem, (viagem) => viagem.veiculo)
//   viagem: Viagem[];

  
}
