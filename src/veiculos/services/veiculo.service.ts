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
        'O ano de fabricação do veículo é menor do que o mínimo permitido (2020).',
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
        // viagem: true,
      },
    });

    if (!veiculo)
      throw new HttpException('Veículo não encontrado', HttpStatus.NOT_FOUND);
    return veiculo;
  }

  async findByModelo(modelo: string): Promise<Veiculo[]> {
    return await this.veiculoRepository.find({
      where: {
        modelo: ILike(`%${modelo}%`),
      },
      relations: {
        // viagem: true,
      },
    });
  }

  async findAll(): Promise<Veiculo[]> {
    return await this.veiculoRepository.find({
      relations: {
        //  viagem: true,
      },
    });
  }

  async findAllAvailable(): Promise<Veiculo[]> {
    return await this.veiculoRepository.find({
      where: {
        disponibilidade: true,
      },
      relations: {
        //  viagem: true,
      },
    });
  }

  async findAllDisable(): Promise<Veiculo[]> {
    return await this.veiculoRepository.find({
      where: {
        disponibilidade: false,
      },
      relations: {
        //  viagem: true,
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
