<div align="center">
  <a name="readme-top"></a>

  <h1>API Tasks</h1>

🚧 **ATENÇÃO: ESTE PROJETO ESTÁ EM DESENVOLVIMENTO!** 🚧

  <p>
     API de gerenciamento de tarefas construída com Node.js, Express, e TypeORM
  </p>

</div>

---

<p align="center">
  <!-- Status da CI/CD (link) - Em validação... -->

  <!-- Tecnologias -->

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-blue?logo=express)
![TypeORM](https://img.shields.io/badge/TypeORM-0.2.x-brightgreen?logo=typeorm)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13.x-blue?logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-blue?logo=docker)
![Swagger](https://img.shields.io/badge/Swagger-3.x-brightgreen?logo=swagger)
![Jest](https://img.shields.io/badge/Jest-27.x-blue?logo=jest)
![Serverless](https://img.shields.io/badge/Serverless-3.x-brightgreen?logo=serverless)

</p>

## 🚀 Como Rodar o Projeto Localmente

A API Tasks pode ser executada de duas formas: com **Docker** ou **Node.js**. Abaixo, explicamos ambas as opções.

### Rodando com Docker Compose

Se você deseja rodar a API e o banco de dados PostgreSQL localmente utilizando o Docker, basta seguir as instruções abaixo.

#### Passos:

1. Certifique-se de ter o [Docker](https://www.docker.com/get-started) instalado na sua máquina.

2. Clone o repositório da **API Tasks**:

   ```bash
   git clone https://github.com/usuário/api-tasks.git
   cd api-tasks
   ```

3. No diretório do projeto, construa a imagem Docker e inicie o container:

   ```bash
   docker-compose up --build
   ```

4. Acesse o projeto no seu navegador:

   ```bash
   http://localhost:3000
   ```

Com isso, a API estará rodando localmente dentro de um container Docker.

### Rodando com Dockerfile para conexão com banco de dados remoto

Caso você queira rodar a API utilizando o Docker e se conectar a um banco de dados PostgreSQL remoto, siga os passos abaixo.

#### Passos:

1. Crie o arquivo `.env` com a configuração do banco de dados remoto:

   ```ini
   PORT=
   DATABASE_HOST=
   DATABASE_PORT=
   DATABASE_USERNAME=
   DATABASE_PASSWORD=
   DATABASE_NAME=
   DATADOG_API_KEY=
   URL_SWAGGER=
   URL_DATADOG=
   ```

2. Construa a imagem Docker:

   ```bash
   docker build -t api-tasks .
   ```

3. Execute o container Docker:

   ```bash
   docker run --env-file .env -p 3000:3000 api-tasks
   ```

4. Acesse o projeto no seu navegador:

   ```bash
   http://localhost:3000
   ```

### Rodando com Node.js

Se você preferir rodar o projeto usando **Node.js**, siga os passos abaixo.

#### Passos:

1. Certifique-se de ter o [Node.js](https://nodejs.org/) (versão 18 ou superior) instalado na sua máquina.

2. Clone o repositório da **API Tasks**:

   ```bash
   git clone https://github.com/izaacledererjunior/apitask
   cd api-tasks
   ```

3. Instale as dependências do projeto:

   ```bash
   npm install
   ```

4. Execute o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Acesse o projeto no seu navegador:

   ```bash
   http://localhost:3000
   ```

---

## Exemplos de Requisições

### 1. Criar uma Nova Tarefa

**Endpoint**: POST /tasks

Exemplo de corpo da requisição:

```json
{
  "name": "Nova Tarefa",
  "description": "Descrição da tarefa",
  "status": "pendente",
  "userId": 1
}
```

**Resposta de Sucesso (201)**:

```json
{
  "message": "Task successfully created",
  "task": {
    "id": 1,
    "name": "Nova Tarefa",
    "description": "Descrição da tarefa",
    "status": "pendente",
    "userId": 1,
    "createdAt": "2025-03-14T21:53:32.000Z",
    "updatedAt": "2025-03-14T21:53:32.000Z"
  }
}
```

### 2. Obter Tarefa por ID

**Endpoint**: GET /tasks/{id}

**Resposta de Sucesso (200)**:

```json
{
  "id": 1,
  "name": "Nova Tarefa",
  "description": "Descrição da tarefa",
  "status": "pendente",
  "userId": 1,
  "createdAt": "2025-03-14T21:53:32.000Z",
  "updatedAt": "2025-03-14T21:53:32.000Z"
}
```

### 3. Obter Todas as Tarefas

**Endpoint**: GET /tasks

**Resposta de Sucesso (200)**:

```json
[
  {
    "id": 1,
    "name": "Nova Tarefa",
    "description": "Descrição da tarefa",
    "status": "pendente",
    "userId": 1,
    "createdAt": "2025-03-14T21:53:32.000Z",
    "updatedAt": "2025-03-14T21:53:32.000Z"
  },
  {
    "id": 2,
    "name": "Outra Tarefa",
    "description": "Descrição de outra tarefa",
    "status": "concluída",
    "userId": 2,
    "createdAt": "2025-03-14T21:53:32.000Z",
    "updatedAt": "2025-03-14T21:53:32.000Z"
  }
]
```

### 4. Atualizar Tarefa por ID

**Endpoint**: PUT /tasks/{id}

Exemplo de corpo da requisição:

```json
{
  "name": "Tarefa Atualizada",
  "description": "Descrição atualizada",
  "status": "em andamento",
  "userId": 1
}
```

**Resposta de Sucesso (200)**:

```json
{
  "message": "Task successfully updated",
  "task": {
    "id": 1,
    "name": "Tarefa Atualizada",
    "description": "Descrição atualizada",
    "status": "em andamento",
    "userId": 1,
    "createdAt": "2025-03-14T21:53:32.000Z",
    "updatedAt": "2025-03-14T21:53:32.000Z"
  }
}
```

### 5. Deletar Tarefa por ID

**Endpoint**: DELETE /tasks/{id}

**Resposta de Sucesso (204)**:

```json
{
  "message": "Task successfully deleted"
}
```

### 6. Obter Tarefas por Usuário ID

**Endpoint**: GET /tasks/user/{userId}

**Resposta de Sucesso (200)**:

```json
[
  {
    "id": 1,
    "name": "Nova Tarefa",
    "description": "Descrição da tarefa",
    "status": "pendente",
    "userId": 1,
    "createdAt": "2025-03-14T21:53:32.000Z",
    "updatedAt": "2025-03-14T21:53:32.000Z"
  }
]
```

### 7. Obter Todas as Tarefas Deletadas

**Endpoint**: GET /tasks/deleted

**Resposta de Sucesso (200)**:

```json
[
  {
    "id": 1,
    "name": "Tarefa Deletada",
    "description": "Descrição da tarefa deletada",
    "status": "deletada",
    "userId": 1,
    "createdAt": "2025-03-14T21:53:32.000Z",
    "updatedAt": "2025-03-14T21:53:32.000Z",
    "deletedAt": "2025-03-14T21:53:32.000Z"
  }
]
```

### 8. Obter Tarefas Deletadas por Usuário ID

**Endpoint**: GET /tasks/deleted/user/{userId}

**Resposta de Sucesso (200)**:

```json
[
  {
    "id": 1,
    "name": "Tarefa Deletada",
    "description": "Descrição da tarefa deletada",
    "status": "deletada",
    "userId": 1,
    "createdAt": "2025-03-14T21:53:32.000Z",
    "updatedAt": "2025-03-14T21:53:32.000Z"
  }
]
```

---

## 📄 Documentação da API

A API é documentada com Swagger, e você pode acessá-la em http://localhost:3000/api-docs quando rodar a aplicação localmente ou pela **[Documentação Lambda User](https://0m77hwa15l.execute-api.us-east-2.amazonaws.com/dev/api-docs/)**

## 🧪 Testes

A API inclui testes unitários utilizando Jest. Para rodar os testes, execute o seguinte comando:

```bash
npm run test
```

---

## ⚠️ **Aviso Importante - Cold Start nas Funções Lambda**

**Devido às funções Lambda operarem por eventos, elas ficam no estado _cold start_ ao serem invocadas pela primeira vez após um período de inatividade.**

⚡ **Impacto**: Para evitar custos adicionais, optei por não utilizar o serviço "Keep Alive" da AWS, que manteria as funções "aquecidas", nem o provisionamento de simultaneidade. Isso pode resultar em latência e até falhas nas primeiras requisições feitas às funções Lambda, seja por meio do Swagger ou pela plataforma API Tasks.

Após o primeiro cold start, as funções começam a operar normalmente, e a latência tende a diminuir. Recomenda-se aguardar até o primeiro uso para evitar o impacto das latências iniciais nas primeiras requisições.

---

## 📜 Licença

- Este projeto está licenciado sob a MIT License. Confira em `LICENSE.txt`.

## 📞 Contato

- **Email**: izaacledererjunior@gmail.com

---

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>
