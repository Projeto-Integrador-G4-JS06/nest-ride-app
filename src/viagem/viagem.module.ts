import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Viagem } from "./entities/viagem.entity";

@Module ({
    imports: [TypeOrmModule.forFeature([Viagem])],
    providers: [], // Registrar as classes de Serviço
    controllers: [], // Registrar as classes Controladoras
    exports: [], // Adicionar as classes que precisam ser disponibilizadas para outros módulos
})
export class ViagemModule {}