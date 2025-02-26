import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Veiculo } from '../entities/veiculo.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class VeiculoService {
  constructor(
    @InjectRepository(Veiculo)
    private veiculoRepository: Repository<Veiculo>,
  ) {}

  async create(veiculo: Veiculo): Promise<Veiculo> {
    const ano = veiculo.ano;

    if (ano < 2020) {
      throw new HttpException(
        'O ano informado para o veículo não é válido. Apenas carros fabricados a partir de 2020 são aceitos. 😊 ',
        HttpStatus.FORBIDDEN,
      );
    } else {
      return await this.veiculoRepository.save(veiculo);
    }
  }

  async findById(id: number): Promise<Veiculo> {
    const veiculo = await this.veiculoRepository.findOne({
      where: {
        id,
      },
      relations: {
        viagem: true,
      },
    });

    if (!veiculo)
      throw new HttpException(
        'ID do veículo não foi encontrado',
        HttpStatus.NOT_FOUND,
      );
    return veiculo;
  }

  async findByModelo(modelo: string): Promise<Veiculo[]> {
    return await this.veiculoRepository.find({
      where: {
        modelo: ILike(`%${modelo}%`),
      },
      relations: {
        viagem: true,
      },
    });
  }

  async findAll(): Promise<Veiculo[]> {
    return await this.veiculoRepository.find({
      relations: {
        viagem: true,
      },
    });
  }

  async findAllAvailable(disponibilidade: boolean): Promise<Veiculo[]> {
    const numero = Number(disponibilidade);
    // Realizada a comparação
    if (numero !== 0 && numero !== 1) {
      throw new HttpException(
        'Valor de disponibilidade inválido. Por favor, forneça 0 (indisponível) ou 1 (disponível).',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.veiculoRepository.find({
      where: {
        disponibilidade: disponibilidade,
      },
    });
  }

  async update(veiculo: Veiculo): Promise<Veiculo> {
    await this.findById(veiculo.id);

    return await this.veiculoRepository.save(veiculo);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.veiculoRepository.delete(id);
  }
}
