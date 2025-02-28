import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Viagem } from '../entities/viagem.entity';
import { DeleteResult, Repository } from 'typeorm';
import { isPast } from 'date-fns';
import { BuscarViagemDto } from '../dto/buscar-viagem.dto';

@Injectable()
export class ViagemService {
  constructor(
    @InjectRepository(Viagem)
    private viagemRepository: Repository<Viagem>,
  ) { }

  async findAll(): Promise<Viagem[]> {
    return this.viagemRepository.find({
      relations: {
        veiculo: true,
        // usuario: true,
      },
    });
  }

  async findById(id: number): Promise<Viagem> {
    const viagem = await this.viagemRepository.findOne({
      where: {
        id,
      },
      relations: {
        veiculo: true,
        // usuario: true,
      },
    });

    if (!viagem)
      throw new HttpException('Viagem não encontrada!', HttpStatus.NOT_FOUND);
    return viagem;
  }

  async matchViagens(buscarViagemDto: BuscarViagemDto): Promise<Viagem[]> {
    const {
      bairro_partida,
      cidade_partida,
      data_partida,
      bairro_destino,
      cidade_destino,
    } = buscarViagemDto;

    const viagens = await this.viagemRepository
      .createQueryBuilder('viagem')
      .leftJoinAndSelect('viagem.veiculo', 'veiculo') // Inclui os dados do veículo
      // .leftJoinAndSelect('viagem.usuario', 'usuario') // Caso queira incluir o usuário no futuro
      .where('LOWER(viagem.bairro_partida) = LOWER(:bairro_partida)', {
        bairro_partida,
      })
      .andWhere('LOWER(viagem.cidade_partida) = LOWER(:cidade_partida)', {
        cidade_partida,
      })
      .andWhere('viagem.data_partida = :data_partida', { data_partida }) // Evita problemas de fuso horário
      .andWhere('LOWER(viagem.bairro_destino) = LOWER(:bairro_destino)', {
        bairro_destino,
      })
      .andWhere('LOWER(viagem.cidade_destino) = LOWER(:cidade_destino)', {
        cidade_destino,
      })
      .getMany();

    if (viagens.length === 0) {
      throw new HttpException(
        'Não há trajetos disponíveis para essas correspondências.',
        HttpStatus.NOT_FOUND,
      );
    }

    return viagens;
  }

  async create(viagem: Viagem): Promise<Viagem> {
    //calculo da duração
    const duracaoSegundos = this.calcularDuracao(
      viagem.distancia,
      viagem.vel_media,
    );

    //formatação para hh:mm:ss
    viagem.duracao = this.formatarDuracao(duracaoSegundos);

    //validação para não aceitar data retroativa
    this.validarData(viagem.data_partida);

    return await this.viagemRepository.save(viagem);
  }

  async update(viagem: Viagem): Promise<Viagem> {
    await this.findById(viagem.id);

    const duracaoSegundos = this.calcularDuracao(
      viagem.distancia,
      viagem.vel_media,
    );

    viagem.duracao = this.formatarDuracao(duracaoSegundos);

    this.validarData(viagem.data_partida);

    return await this.viagemRepository.save(viagem);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.viagemRepository.delete(id);
  }

  calcularDuracao(distancia: number, vel_media: number): number {
    //conversão para m/s
    distancia = distancia * 1000;
    vel_media = vel_media / 3.6;

    const duracaoSegundos = distancia / vel_media;

    return duracaoSegundos;
  }

  formatarDuracao(segundosTotais: number): string {
    const horas = Math.floor(segundosTotais / 3600);
    const minutos = Math.floor((segundosTotais % 3600) / 60);
    const segundos = Math.floor(segundosTotais % 60);

    // Formatador para garantir 2 dígitos
    const formatador = new Intl.NumberFormat('pt-BR', {
      minimumIntegerDigits: 2,
    });

    return `${formatador.format(horas)}:${formatador.format(minutos)}:${formatador.format(segundos)}`;
  }

  validarData(data_partida: Date) {
    if (isPast(data_partida)) {
      throw new BadRequestException(
        'A data de partida não pode ser retroativa',
      );
    }
  }
}
