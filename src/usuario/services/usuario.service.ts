import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { ILike, Repository } from 'typeorm';
import { UsuarioDto } from '../dto/usuario.dto';
import { plainToInstance } from 'class-transformer';

export function validarIdade(
  dataNascimento: Date,
  idadeMinima: number = 18,
): void {
  const dataAtual = new Date();
  let idade = dataAtual.getFullYear() - dataNascimento.getFullYear();
  const mesAtual = dataAtual.getMonth();
  const diaAtual = dataAtual.getDate();
  const mesNascimento = dataNascimento.getMonth();
  const diaNascimento = dataNascimento.getDate();

  if (
    mesAtual < mesNascimento ||
    (mesAtual === mesNascimento && diaAtual < diaNascimento)
  ) {
    idade--;
  }

  if (idade < idadeMinima) {
    throw new HttpException(
      'Usuário com idade inferior à permitida.',
      HttpStatus.BAD_REQUEST,
    );
  }
}

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });

    if (!usuario)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    return usuario;
  }

  async findByNome(nome: string): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: { nome: ILike(`%${nome}%`) },
    });
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({ where: { email } });
  }

  async create(usuarioDto: UsuarioDto): Promise<Usuario> {
    const buscaUsuario = await this.findByEmail(usuarioDto.email);

    if (buscaUsuario) {
      throw new HttpException('O Usuário já existe!', HttpStatus.BAD_REQUEST);
    }

    const usuario = plainToInstance(Usuario, usuarioDto);
    usuario.data_nascimento = new Date(usuarioDto.data_nascimento); // Garantindo que seja um Date

    validarIdade(usuario.data_nascimento);

    return await this.usuarioRepository.save(usuario);
  }

  async update(id: number, usuarioDto: UsuarioDto): Promise<Usuario> {
    const usuarioExistente = await this.findById(id);

    if (!usuarioExistente) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    const buscaUsuario = await this.findByEmail(usuarioDto.email);

    if (buscaUsuario && buscaUsuario.id !== id) {
      throw new HttpException(
        'Usuário (e-mail) já cadastrado!',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Atualizar os campos manualmente
    usuarioExistente.nome = usuarioDto.nome;
    usuarioExistente.email = usuarioDto.email;
    usuarioExistente.senha = usuarioDto.senha;
    usuarioExistente.foto = usuarioDto.foto;
    usuarioExistente.cpf = usuarioDto.cpf;
    usuarioExistente.endereco = usuarioDto.endereco;
    usuarioExistente.numero_telefone = usuarioDto.numero_telefone;
    usuarioExistente.tipo_usuario = usuarioDto.tipo_usuario;
    usuarioExistente.data_nascimento = new Date(usuarioDto.data_nascimento); // Garantindo que seja um Date

    validarIdade(usuarioExistente.data_nascimento);

    return await this.usuarioRepository.save(usuarioExistente);
  }
}
