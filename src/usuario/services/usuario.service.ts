import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { ILike, Repository } from 'typeorm';

export function validarIdade(
  dataNascimento: string | Date,
  idadeMinima: number = 18,
): void {
  const dataNascimentoDate = new Date(dataNascimento);

  const dataAtual = new Date();
  let idade = dataAtual.getFullYear() - dataNascimentoDate.getFullYear();
  const mesAtual = dataAtual.getMonth();
  const diaAtual = dataAtual.getDate();
  const mesNascimento = dataNascimentoDate.getMonth();
  const diaNascimento = dataNascimentoDate.getDate();

  if (
    mesAtual < mesNascimento ||
    (mesAtual === mesNascimento && diaAtual < diaNascimento)
  ) {
    idade--;
  }

  if (idade < idadeMinima) {
    throw new HttpException('Usuário com idade inferior à permitida.', HttpStatus.BAD_REQUEST);
  }
}

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      relations: {
        viagem: true,
      },
    });
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        id,
      },
      relations: {
        viagem: true,
      },
    });

    if (!usuario)
      throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

    return usuario;
  }

  async findByNome(nome: string): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        viagem: true,
      },
    });
  }

  // Método auxiliar para validação do usuário
  async findByEmail(email: string): Promise<Usuario | undefined> {
    return await this.usuarioRepository.findOne({
      where: {
        email: email,
      },
      relations: {
        viagem: true,
      },
    });
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const buscaUsuario = await this.findByEmail(usuario.email);

    if (buscaUsuario) {
      throw new HttpException('O Usuário já existe!', HttpStatus.BAD_REQUEST);
    }

    // Validar a idade do usuário
    validarIdade(usuario.data_nascimento);

    return await this.usuarioRepository.save(usuario);
  }

  async update(usuario: Usuario): Promise<Usuario> {
    await this.findById(usuario.id);

    const buscaUsuario = await this.findByEmail(usuario.email);

    if (buscaUsuario && buscaUsuario.id !== usuario.id)
      throw new HttpException(
        'Usuário (e-mail) já cadastrado!',
        HttpStatus.BAD_REQUEST,
      );

    // Validar a idade do usuário
    validarIdade(usuario.data_nascimento);

    return await this.usuarioRepository.save(usuario);
  }
}
