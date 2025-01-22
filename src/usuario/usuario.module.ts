import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";
import { UsuarioService } from "./services/usuario.service";
import { UsuarioController } from "./controllers/usuario.controller";

@Module ({
    imports: [TypeOrmModule.forFeature([Usuario])], // Inserir o nome da classe Entidade (Model) do módulo
    providers: [UsuarioService], // Registrar as classes de Serviço
    controllers: [UsuarioController], // Registrar as classes Controladoras
    exports: [UsuarioService], // Adicionar as classes que precisam ser disponibilizadas para outros módulos
})
export class UsuarioModule {}

