import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViagemModule } from './viagem/viagem.module';
import { UsuarioModule } from './usuario/usuario.module';
import { VeiculoModule } from './veiculo/veiculo.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),
    UsuarioModule,
    VeiculoModule,
    ViagemModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
