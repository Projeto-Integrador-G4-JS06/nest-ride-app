import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ViagemService } from "../services/viagem.service";
import { Viagem } from "../entities/viagem.entity";


@Controller("/viagens")
export class ViagemController {

    constructor(
        private readonly viagemService: ViagemService
    ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Viagem[]>{
        return this.viagemService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Viagem>{
        return this.viagemService.findById(id);
    }

    @Get('/local_destino/:local_destino')
    @HttpCode(HttpStatus.OK)
    findByDestino(@Param('local_destino') local_destino: string): Promise<Viagem[]>{
        return this.viagemService.findByDestino(local_destino);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() viagem: Viagem): Promise<Viagem>{
        return this.viagemService.create(viagem);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() viagem: Viagem): Promise<Viagem>{
        return this.viagemService.update(viagem);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.viagemService.delete(id);
    }

}