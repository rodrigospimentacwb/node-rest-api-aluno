# API de Gerenciamento de Alunos

Esta API permite o gerenciamento de informações de alunos, incluindo a criação, atualização, recuperação e exclusão de registros de alunos.

## Pré-requisitos

Certifique-se de que você tenha as seguintes dependências instaladas:

- Node.js
- Express.js
- Knex.js
- Banco de dados configurado de acordo com o knexfile.js

## Configuração

Certifique-se de configurar corretamente o arquivo `knexfile.js` para se conectar ao seu banco de dados.

## Sequencia utilizada de comando desde a criação do projeto

```
    npm init
    npm --install express --save 
    npm --install knex --save
    npm --install morgan --save
    npm --install sqlite3 --save
    npx kenx init
    npx knex migrate:make create_alunos
    npx knex migrate:up
    npx knex seed:make alunos.js
    npx knex seed:run
    nodemon .\server.js
```
**Não é necessário roda-los, utilize apenas como conhecimento do fluxo de criação do projeto para fazer um novo**

## Para rodar o projeto

Se acabou de baixar o projeto, apenas rode o comando abaixo para carregar o node_modules e execute o projeto com o segundo comando:

```
node install
node .\server.js
```

## Endpoints

Projeto contem um arquivo de collection pronto chamado **rest-api-alunos.postman_collection.json** que pode ser importado no Postman.

### Listar Todos os Alunos

- **URL**: `/alunos`
- **Método HTTP**: GET
- **Descrição**: Retorna uma lista de todos os alunos cadastrados.
- **Resposta de Sucesso**:
  - **Código**: 200 OK
  - **Exemplo de Resposta**:
    ```json
    [
      {
        "id": 1,
        "nome": "João",
        "genero": "M",
        "email": "joao@example.com"
      },
      {
        "id": 2,
        "nome": "Maria",
        "genero": "F",
        "email": "maria@example.com"
      }
    ]
    ```
- **Resposta de Erro**:
  - **Código**: 500 Internal Server Error
  - **Exemplo de Resposta**:
    ```json
    {
      "mensagem": "Erro ao buscar alunos."
    }
    ```

### Buscar Aluno por ID

- **URL**: `/alunos/:id_aluno`
- **Método HTTP**: GET
- **Descrição**: Retorna os detalhes de um aluno com base no ID fornecido.
- **Parâmetros de URL**:
  - `id_aluno` (integer): ID do aluno a ser buscado.
- **Resposta de Sucesso**:
  - **Código**: 200 OK
  - **Exemplo de Resposta**:
    ```json
    {
      "id": 1,
      "nome": "João",
      "genero": "M",
      "email": "joao@example.com"
    }
    ```
- **Resposta de Erro**:
  - **Código**: 404 Not Found
  - **Exemplo de Resposta**:
    ```json
    {
      "mensagem": "Aluno não encontrado."
    }
    ```

### Criar um Novo Aluno

- **URL**: `/alunos`
- **Método HTTP**: POST
- **Descrição**: Cria um novo aluno com os dados fornecidos.
- **Corpo da Solicitação**:
  ```json
  {
    "nome": "Maria",
    "genero": "F",
    "email": "maria@example.com"
  }
- **Resposta de Sucesso**:
  - **Código**: 201 Created
  - **Exemplo de Resposta**:
    ```json
    {
      "id": 3,
      "nome": "Maria",
      "genero": "F",
      "email": "maria@example.com"
    }
    ```
- **Resposta de Erro**:
  - **Código**: 400 Bad Request
  - **Exemplo de Resposta**:
    ```json
    {
      "mensagem": "Preencha todos os campos obrigatórios."
    }
    ```

### Atualizar dados de um Aluno

- **URL**: `/alunos/:id_aluno`
- **Método HTTP**: PUT
- **Descrição**: Atualiza os dados de um aluno com base no ID fornecido.
- **Parâmetros de URL**:
  - `id_aluno` (integer): ID do aluno a ser atualizado.
- **Corpo da Solicitação**:
  ```json
  {
    "nome": "João Silva",
    "genero": "M",
    "email": "joao.silva@example.com"
  }
- **Resposta de Sucesso**:
  - **Código**: 200 OK
  - **Exemplo de Resposta**:
    ```json
    {
      "id": 1,
      "nome": "João",
      "genero": "M",
      "email": "joao@example.com"
    }
    ```
- **Resposta de Erro**:
  - **Código**: 404 Not Found
  - **Exemplo de Resposta**:
    ```json
    {
      "mensagem": "Aluno não encontrado."
    }
    ```
    
### Excluir Aluno

- **URL**: `/alunos/:id_aluno`
- **Método HTTP**: DELETE
- **Descrição**: Exclui um aluno com base no ID fornecido.
- **Parâmetros de URL**:
  - `id_aluno` (integer): ID do aluno a ser excluído.
- **Resposta de Sucesso**:
  - **Código**: 204 No Content
