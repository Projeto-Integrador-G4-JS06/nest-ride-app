# Projeto BoraAí - Backend

<br />
<div align="center">
    <img src="https://ik.imagekit.io/czhooyc3x/BoraA%C3%AD/BORA%20AI.svg?updatedAt=1741553452499" title="Logo - BoraAí" width="50%"/>
</div>
<br /><br />

## 1. Descrição

O BoraAí é uma plataforma de caronas compartilhadas que conecta motoristas e passageiros que possuem trajetos em comum. Com foco na praticidade, economia e sustentabilidade, a aplicação permite criar e gerenciar viagens, promovendo a redução de custos e o impacto ambiental positivo.

---

## 2. Sobre esta API

Esta API foi construída para ser o backend do sistema BoraAí, centralizando o gerenciamento de usuários, veículos e viagens. Sua arquitetura segue os princípios de modularidade, escalabilidade e boas práticas de desenvolvimento, garantindo alta performance e facilidade de manutenção.

### 2.1. Principais Funcionalidades

1. Cadastro e gerenciamento de usuários.

2. Cadastro e gerenciamento de veículos.

3. Criação, consulta e gerenciamento de viagens.

4. Relacionamentos eficientes entre entidades (usuários, veículos e viagens).

5. Banco de dados relacional com suporte a consultas e transações complexas.

---

## 3. Diagrama de Classes

```mermaid
classDiagram
    class Usuario {
        - id: number
        - nome_completo: string
        - username: string
        - senha: string
        - cpf: string
        - data_nascimento: Date
        - foto: string
        - numero_telefone: string
        - tipo_usuario: string
        - endereco: string
        - criado_em: Date
        - atualizado_em: Date
        - viagem: Viagem
        + create(usuario: Usuario): Promise<Usuario>
        + findAll(): Promise<Usuario[]>
        + findById(id: number): Promise<Usuario>
        + findByNome(nome: string): Promise<Usuario[]>
        + findByEmail(email: string): Promise<Usuario | undefined>
        + update(usuario: Usuario): Promise<Usuario>
        + validarIdade(dataNascimento: string | Date, idadeMinima: number = 18): boolean
    }

    class Veiculo {
        - id: number
        - modelo: string
        - placa: string
        - marca: string
        - ano: number
        - cor: string
        - tipo: string
        - foto: string
        - tipo_combustivel: string
        - num_assentos: number
        - autonomia: number
        - capacidade: number
        - itens: string
        - disponibilidade: boolean
        - criado_em: Date
        - atualizado_em: Date
        - viagem: Viagem
        + create(veiculo: Veiculo): Promise<Veiculo>
        + findById(id: number): Promise<Veiculo>
        + findByModelo(modelo: string): Promise<Veiculo[]>
        + findAll(): Promise<Veiculo[]>
        + findAllAvailable(disponibilidade: boolean): Promise<Veiculo[]>
        + update(veiculo: Veiculo): Promise<Veiculo>
        + delete(id: number): Promise<DeleteResult>
    }

    class Viagem {
        - id: number
        - local_partida: string
        - horario_partida: string
        - data_partida: Date
        - local_destino: string
        - distancia: number
        - vel_media: number
        - duracao: number
        - preco: number
        - usuario_id: number
        - veiculo_id: number
        + create(viagem: Viagem): Promise<Viagem>
        + findAll(): Promise<Viagem[]>
        + findById(id: number): Promise<Viagem>
        + findByDestino(local_destino: string): Promise<Viagem[]>
        + update(viagem: Viagem): Promise<Viagem>
        + delete(id: number): Promise<DeleteResult>
        + calcularDuracao(distancia: number, vel_media: number): number
        + formatarDuracao(segundosTotais: number): string
        + validarData(data_partida: Date): boolean
    }

    Usuario "1" --> "n" Viagem
    Viagem "n" --> "1" Usuario
    Veiculo "1" --> "n" Viagem
    Viagem "n" --> "1" Veiculo

```

---

## 4. Diagrama Entidade-Relacionamento (DER)

Adicione a imagem do Diagrama:

<div align="center">
    <img src="https://cdn.discordapp.com/attachments/1331751152190099576/1332038711793418240/DER.png?ex=6793cd38&is=67927bb8&hm=d0da1b4b4887e9c7a00e41cb062289aef1da62f8cc585635121d78d12736b761&" alt="Diagrama Entidade-Relacionamento (DER)" />
</div>

---

## 5. Tecnologias Utilizadas

| Item                          | Descrição  |
| ----------------------------- | ---------- |
| **Servidor**                  | Node.js    |
| **Linguagem de Programação**  | TypeScript |
| **Framework**                 | NestJS     |
| **ORM**                       | TypeORM    |
| **Banco de Dados Relacional** | MySQL      |

---

## 6. Configuração e Execução

1. Clone o repositório:

   ```bash

   git clone [https://github.com/seu-repositorio/boraaí-backend.git](https://github.com/Projeto-Integrador-G4-JS06/nest-ride-app.git)

   ```

2. Instale as dependências:

   ```bash

   npm install

   ```

3. Configure o banco de dados no arquivo `app.module.ts`.

4. Execute a aplicação:

   ```bash

   npm run start:dev
   ```
