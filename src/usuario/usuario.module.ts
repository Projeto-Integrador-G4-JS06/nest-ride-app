import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";

@Module ({
    imports: [TypeOrmModule.forFeature([Usuario])], // Inserir o nome da classe Entidade (Model) do módulo
    providers: [], // Registrar as classes de Serviço
    controllers: [], // Registrar as classes Controladoras
    exports: [], // Adicionar as classes que precisam ser disponibilizadas para outros módulos
})
export class UsuarioModule {}

