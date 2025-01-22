import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veiculo } from './veiculos/entities/veiculo.entity';
import { VeiculoModule } from './veiculos/veiculos.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'db_rides_app', // Cadastrar o nome do BD
    entities: [Veiculo], // Cadastrar as Classes Entities, para que o 
    // TypeORM possa gerar as tabelas correspondentes no BD
    synchronize: true,
    logging: true
  }),
  // Inserir nome da classe module de cada entidade (ex.: PostagemModule)
  VeiculoModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
