import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Viagem } from './viagem/entities/viagem.entity';
import { ViagemModule } from './viagem/viagem.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { Veiculo } from './veiculo/entities/veiculo.entity';
import { VeiculoModule } from './veiculo/veiculo.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'db_rides_app',
    entities: [Viagem, Usuario, Veiculo],
    synchronize: true,
    logging: true
  }),
    ViagemModule,
    UsuarioModule,
    VeiculoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
