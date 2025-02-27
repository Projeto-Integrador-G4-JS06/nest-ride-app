import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Veiculo } from '../../veiculo/entities/veiculo.entity';
import { Viagem } from '../../viagem/entities/viagem.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Injectable()
export class DevService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_rides_app',
      entities: [Veiculo, Viagem, Usuario],
      synchronize: true,
    };
  }
}
