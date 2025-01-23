import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Viagem } from "./entities/viagem.entity";
import { UsuarioModule } from "../usuario/usuario.module";
import { VeiculoModule } from "../veiculo/veiculo.module";
import { ViagemService } from "./services/viagem.service";
import { ViagemController } from "./controllers/viagem.controller";

@Module ({
    imports: [TypeOrmModule.forFeature([Viagem]), VeiculoModule, UsuarioModule],
    providers: [ViagemService],
    controllers: [ViagemController],
    exports: [TypeOrmModule],
})
export class ViagemModule {}


