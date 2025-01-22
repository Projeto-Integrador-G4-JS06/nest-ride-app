import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Veiculo } from "./entities/veiculo.entity";

@Module ({
    imports: [TypeOrmModule.forFeature([Veiculo])], // Inserir o nome da classe Entidade (Model) do módulo
    providers: [], // Registrar as classes de Serviço
    controllers: [], // Registrar as classes Controladoras
    exports: [], // Adicionar as classes que precisam ser disponibilizadas para outros módulos
})
export class VeiculoModule {}