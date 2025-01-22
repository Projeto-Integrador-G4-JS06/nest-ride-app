import { All, Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common"
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

    @Get('/cpf/:cpf')
    @HttpCode(HttpStatus.OK)
    findByCpf(@Param('cpf')cpf: string): Promise<Usuario[]>{
        return this.usuarioService.findByCpf(cpf)
    }


}