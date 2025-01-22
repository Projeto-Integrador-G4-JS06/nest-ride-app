import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { Veiculo } from './veiculos/entities/veiculo.entity';
import { VeiculoModule } from './veiculos/veiculo.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'db_rides_app', // Cadastrar o nome do BD
    entities: [Usuario, Veiculo], // Cadastrar as Classes Entities, para que o 
    // TypeORM possa gerar as tabelas correspondentes no BD
    synchronize: true,
    logging: true
  }),
  UsuarioModule, VeiculoModule
  // Inserir nome da classe module de cada entidade (ex.: PostagemModule)
  

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
