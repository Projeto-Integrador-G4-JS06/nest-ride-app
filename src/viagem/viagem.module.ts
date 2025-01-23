import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Viagem } from "./entities/viagem.entity";
import { UsuarioModule } from "../usuario/usuario.module";
import { VeiculoModule } from "../veiculo/veiculo.module";

@Module ({
    imports: [TypeOrmModule.forFeature([Viagem]), VeiculoModule, UsuarioModule],
    providers: [], // Registrar as classes de Serviço
    controllers: [], // Registrar as classes Controladoras
    exports: [], // Adicionar as classes que precisam ser disponibilizadas para outros módulos
})
export class ViagemModule {}


