import {
  BadRequestException,
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
import { ViagemService } from '../services/viagem.service';
import { Viagem } from '../entities/viagem.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Viagem')
@Controller('/viagens')
export class ViagemController {
  constructor(private readonly viagemService: ViagemService) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Viagem[]> {
    return this.viagemService.findAll();
  }

  @Get('/id/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Viagem> {
    return this.viagemService.findById(id);
  }

  @Get('/localdestino/:localdestino')
  @HttpCode(HttpStatus.OK)
  findByDestino(
    @Param('localdestino') local_destino: string,
  ): Promise<Viagem[]> {
    return this.viagemService.findByDestino(local_destino);
  }

  @Get('/localpartida/:localpartida')
  @HttpCode(HttpStatus.OK)
  findByPartida(
    @Param('localpartida') local_partida: string,
  ): Promise<Viagem[]> {
    return this.viagemService.findByPartida(local_partida);
  }

  @Post('buscar')
  async matchViagens(@Body() body: any): Promise<Viagem[]> {
    const { local_partida, horario_partida, data_partida, local_destino } =
      body;

    if (!local_partida || !horario_partida || !data_partida || !local_destino) {
      throw new BadRequestException('Todos os campos são obrigatórios.');
    }

    return this.viagemService.matchViagens(
      local_partida,
      horario_partida,
      data_partida,
      local_destino,
    );
  }

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() viagem: Viagem): Promise<Viagem> {
    return this.viagemService.create(viagem);
  }

  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  update(@Body() viagem: Viagem): Promise<Viagem> {
    return this.viagemService.update(viagem);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.viagemService.delete(id);
  }
}
