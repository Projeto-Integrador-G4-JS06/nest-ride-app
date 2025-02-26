import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veiculo } from './entities/veiculo.entity';
import { VeiculoController } from './controllers/veiculo.controller';
import { VeiculoService } from './services/veiculo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Veiculo])], // Inserir o nome da classe Entidade (Model) do módulo
  providers: [VeiculoService], // Registrar as classes de Serviço
  controllers: [VeiculoController], // Registrar as classes Controladoras
  exports: [VeiculoService], // Adicionar as classes que precisam ser disponibilizadas para outros módulos
})
export class VeiculoModule {}
