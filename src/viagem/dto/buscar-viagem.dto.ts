import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class BuscarViagemDto {
  @IsNotEmpty()
  @IsString()
  bairro_partida: string;

  @IsNotEmpty()
  @IsString()
  cidade_partida: string;

  @IsNotEmpty()
  @IsDateString()
  data_partida: string; // Recebe no formato 'YYYY-MM-DD'

  @IsNotEmpty()
  @IsString()
  bairro_destino: string;

  @IsNotEmpty()
  @IsString()
  cidade_destino: string;
}
