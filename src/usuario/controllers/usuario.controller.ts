import { All, Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common"
import { UsuarioService } from "../services/usuario.service"
import { Usuario } from "../entities/usuario.entity"

@Controller("/usuarios")
export class UsuarioController{

    constructor(private readonly usuarioService: UsuarioService){ }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]>{
        return this.usuarioService.findAll();
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() usuario: Usuario): Promise<Usuario>{
        return this.usuarioService.create(usuario)
    }

    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update(@Body() usuario: Usuario): Promise<Usuario>{
        return this.usuarioService.update(usuario)
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome')nome: string): Promise<Usuario[]>{
        return this.usuarioService.findByNome(nome)
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe)id: number): Promise<Usuario>{
        return this.usuarioService.findById(id)
    }


}