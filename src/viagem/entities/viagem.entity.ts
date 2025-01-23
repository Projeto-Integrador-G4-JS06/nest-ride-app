import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { NumericTransformer } from "../../util/numerictransformer";
import { DateTransformer } from "../../util/datetransformer";


@Entity({name: 'tb_viagens'})
export class Viagem {

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    local_partida: string

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 5, nullable: false})
    horario_partida: string;

    @IsNotEmpty()
    @Column({type: "date", transformer: new DateTransformer(), nullable: false})
    data_partida: Date;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    local_destino: string;

    @Column({type: "float", nullable: true})
    distancia: number;

    @IsNotEmpty()
    @Column({type: "float", nullable: false})
    vel_media: number;

    @Column({length: 8, nullable: false})
    duracao: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @IsPositive()
    @Column({ type: "decimal", precision: 10, scale: 2, transformer: new NumericTransformer(), nullable: false})
    preco: number;

    //veiculo: Veiculo;

    //usuario: Usuario;

    @CreateDateColumn()
    criado_em: Date;

    @UpdateDateColumn()
    atualizado_em: Date;




}
