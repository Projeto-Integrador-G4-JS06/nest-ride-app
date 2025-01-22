import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Viagem } from './viagem/entities/viagem.entity';
import { ViagemModule } from './viagem/viagem.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'db_rides_app',
    entities: [Viagem],
    synchronize: true,
    logging: true
  }),
  ViagemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
