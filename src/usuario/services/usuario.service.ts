import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
         //  relations:{
    //    usuario: true
    // }
    }); 
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        id,
      },
       //  relations:{
    //    usuario: true
    // }
    });

    if (!usuario)
      throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

    return usuario;
  }

  async findByNome(nome_completo: string): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: {
        nome_completo: ILike(`%${nome_completo}%`),
      },
    //  relations:{
    //    usuario: true
    // }
    })
  }

  //metodo auxiliar para validação do usuario
  async findByUsuario(usuario: string): Promise<Usuario | undefined> {
    return await this.usuarioRepository.findOne({
      where: {
        usuario: usuario,
      },
       //  relations:{
    //    usuario: true
    // }
    });
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const buscaUsuario = await this.findByUsuario(usuario.usuario);

    if (buscaUsuario)
      throw new HttpException('O Usuário já existe!', HttpStatus.BAD_REQUEST);

    usuario.data_nascimento = new Date(usuario.data_nascimento);

    const dataAtual = new Date();
    let idade = dataAtual.getFullYear() - usuario.data_nascimento.getFullYear();
    const diaAtual = dataAtual.getDay();
    const mesAtual = dataAtual.getMonth();
    const mesNascimento = usuario.data_nascimento.getMonth();
    const diaNascimento = usuario.data_nascimento.getDay();

    if (
      mesAtual < mesNascimento ||
      (mesAtual === mesNascimento && diaAtual < diaNascimento)
    )
      idade--;

    if (idade < 18)
      throw new HttpException(
        'Usuario precisa ter 18 anos!',
        HttpStatus.BAD_REQUEST,
      );

    return await this.usuarioRepository.save(usuario);
  }

//não esquecer de não deixar atualizar usuarios menores de idade
  async update(usuario: Usuario): Promise<Usuario> {
    await this.findById(usuario.id);

    const buscaUsuario = await this.findByUsuario(usuario.usuario);

    if (buscaUsuario && buscaUsuario.id !== usuario.id)
      throw new HttpException(
        'O Usuário (e-mail) já cadastrado!',
        HttpStatus.BAD_REQUEST,
      );



    return await this.usuarioRepository.save(usuario);
  }
}
