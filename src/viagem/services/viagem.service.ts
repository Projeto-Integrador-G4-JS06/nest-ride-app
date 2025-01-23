import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Viagem } from "../entities/viagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";


@Injectable()
export class ViagemService{

    constructor(
        @InjectRepository(Viagem)
        private viagemRepository: Repository<Viagem>,

    ){}

    async findAll(): Promise<Viagem[]>{
        return this.viagemRepository.find({
            // relations:{
            //     veiculo: true,
            //     usuario: true
            // }
        }); 
    }

    async findById(id: number): Promise<Viagem>{
        const viagem = await this.viagemRepository.findOne({
            where: {
                id
            },
            // relations:{
            //     veiculo: true,
            //     usuario: true
            // }
        })

        if(!viagem)
            throw new HttpException('Viagem não encontrada!', HttpStatus.NOT_FOUND)
        return viagem;
    }

    async findByDestino(local_destino: string): Promise<Viagem[]>{
        return this.viagemRepository.find({
            where: {
                local_destino: ILike(`%${local_destino}%`)
            },
            // relations:{
            //     veiculo: true,
            //     usuario: true
            // }
        }); 
    }

    async create(viagem: Viagem): Promise<Viagem>{

        //calculo da duração
        const duracaoSegundos = this.calcularDuracao(
            viagem.distancia,
            viagem.vel_media
        )

        //formatação para hh:mm:ss
        viagem.duracao = this.formatarDuracao(duracaoSegundos)

        //validação para não aceitar data retroativa
        this.validarData(viagem.data_partida)

        return await this.viagemRepository.save(viagem)

    }

    async update(viagem: Viagem): Promise<Viagem>{
        await this.findById(viagem.id)

        const duracaoSegundos = this.calcularDuracao(
            viagem.distancia,
            viagem.vel_media
        )
        
        viagem.duracao = this.formatarDuracao(duracaoSegundos)

        this.validarData(viagem.data_partida)

        return await this.viagemRepository.save(viagem)
     }

    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id)
        return await this.viagemRepository.delete(id)
    }

    calcularDuracao(distancia: number, vel_media: number): number {
        //conversão para m/s
        distancia = distancia * 1000;
        vel_media = (vel_media/3.6);

        const duracaoSegundos = distancia/vel_media;

        return duracaoSegundos;
    }

    formatarDuracao(segundosTotais: number): string {
        const horas = Math.floor(segundosTotais / 3600);
        const minutos = Math.floor((segundosTotais % 3600) / 60);
        const segundos = Math.floor(segundosTotais % 60);
    
        // Formatador para garantir 2 dígitos
        const formatador = new Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 2 });
    
        return `${formatador.format(horas)}:${formatador.format(minutos)}:${formatador.format(segundos)}`;
    }

    validarData(data_partida: Date) {

        const { isPast } = require("date-fns");
        const result = isPast(data_partida);

        if(result)
            throw new BadRequestException('A data de partida não pode ser retroativa')
    }


}