import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { VeiculoService } from '../services/veiculo.service';
import { Veiculo } from '../entities/veiculo.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Veiculo')
@Controller('/veiculos')
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Veiculo[]> {
    return this.veiculoService.findAll();
  }

  @Get('/id/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Veiculo> {
    return this.veiculoService.findById(id);
  }

  @Get('/modelo/:modelo') // O primeiro é o caminho, o segundo é a variavel
  @HttpCode(HttpStatus.OK)
  findByModelo(@Param('modelo') modelo: string): Promise<Veiculo[]> {
    return this.veiculoService.findByModelo(modelo);
  }

  @Get('/disponibilidade/:disponibilidade')
  @HttpCode(HttpStatus.OK)
  findAllAvailable(
    @Param('disponibilidade') disponibilidade: boolean,
  ): Promise<Veiculo[]> {
    return this.veiculoService.findAllAvailable(disponibilidade);
  }

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() veiculo: Veiculo): Promise<Veiculo> {
    return this.veiculoService.create(veiculo);
  }

  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  async update(@Body() veiculo: Veiculo): Promise<Veiculo> {
    return this.veiculoService.update(veiculo);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.veiculoService.delete(id);
  }
}
