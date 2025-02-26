import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NumericTransformer } from '../../util/numerictransformer';
import { DateTransformer } from '../../util/datetransformer';
import { Veiculo } from '../../veiculo/entities/veiculo.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_viagens' })
export class Viagem {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  local_partida: string;

  @ApiProperty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 5, nullable: false })
  horario_partida: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'date', transformer: new DateTransformer(), nullable: false })
  data_partida: Date;

  @ApiProperty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  local_destino: string;

  @ApiProperty()
  @Column({ type: 'float', nullable: true })
  distancia: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'float', nullable: false })
  vel_media: number;

  @ApiProperty()
  @Column({ length: 8, nullable: false })
  duracao: string;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @IsPositive()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new NumericTransformer(),
    nullable: false,
  })
  preco: number;

  @ApiProperty({ type: () => Veiculo })
  @ManyToOne(() => Veiculo, (veiculo) => veiculo.viagem, {
    onDelete: 'CASCADE',
  })
  veiculo: Veiculo;

  @ApiProperty({ type: () => Usuario })
  @ManyToOne(() => Usuario, (usuario) => usuario.viagem, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;

  @ApiProperty()
  @CreateDateColumn()
  criado_em: Date;

  @ApiProperty()
  @UpdateDateColumn()
  atualizado_em: Date;
}
