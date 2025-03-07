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
import { ViagemService } from '../services/viagem.service';
import { Viagem } from '../entities/viagem.entity';
import { ApiTags } from '@nestjs/swagger';
import { BuscarViagemDto } from '../dto/buscar-viagem.dto';

@ApiTags('Viagem')
@Controller('/viagens')
export class ViagemController {
  constructor(private readonly viagemService: ViagemService) { }

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

  @Post('buscar')
  async matchViagens(
    @Body() buscarViagemDto: BuscarViagemDto,
  ): Promise<Viagem[]> {
    return this.viagemService.matchViagens(buscarViagemDto);
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
