# 🚀 Bytebank API GraphQL - Documentação de Uso

Bem-vindo à documentação de uso da API GraphQL do Bytebank. Este guia detalha como interagir com a API, incluindo todas as queries e mutations disponíveis, e os dados esperados para cada operação.

A API é construída com **Node.js**, **TypeScript**, **Apollo Server**, **Express** e **MongoDB**, oferecendo funcionalidades de autenticação de usuários e gerenciamento de transações financeiras. A autenticação é realizada via JSON Web Tokens (JWT), e as rotas protegidas são acessíveis apenas com um token válido.

## ✨ Funcionalidades Principais

* **Autenticação de Usuário**: Registro e login seguros com JWT.
* **Gerenciamento de Transações**: Operações de CRUD (Criar, Ler, Atualizar, Deletar) para transações financeiras.
* **Resumo Financeiro**: Endpoint para obter o saldo atual e um resumo das transações.
* **Paginação**: Suporte para paginação na listagem de transações.
* **Segurança**: Senhas criptografadas e rotas protegidas por autenticação.

## 💡 Endereço da API

A API estará disponível em `http://localhost:4000/graphql` quando executada localmente.

## 🔑 Autenticação

A autenticação é realizada via JSON Web Tokens (JWT). Após o login ou registro, você receberá um `token` que deve ser incluído no cabeçalho `Authorization` de todas as suas requisições protegidas, no formato `Bearer <seu_token>`.

Exemplo de cabeçalho de autorização:

```
Authorization: Bearer seu_token_jwt_aqui
```

## 📖 Schema GraphQL

A API GraphQL possui os seguintes tipos, inputs e enums:

### Tipos

* **AuthPayload**: Retornado em operações de autenticação.
    * `token`: `String!` - O token JWT para autenticação.
    * `user`: `User!` - Os detalhes do usuário autenticado.
* **User**: Representa um usuário no sistema.
    * `_id`: `ID!` - O ID único do usuário.
    * `acceptPrivacy`: `Boolean!` - Indica se o usuário aceitou a política de privacidade.
    * `createdAt`: `DateTimeISO!` - Data e hora de criação do usuário (UTC).
    * `email`: `String!` - O endereço de e-mail do usuário.
    * `name`: `String!` - O nome do usuário.
    * `updatedAt`: `DateTimeISO!` - Data e hora da última atualização do usuário (UTC).
* **Transaction**: Representa uma transação financeira.
    * `_id`: `ID!` - O ID único da transação.
    * `alias`: `String` - Um alias opcional para a transação.
    * `date`: `String!` - A data da transação.
    * `desc`: `TransactionDesc!` - A descrição da transação (depósito, pagamento, transferência, saque).
    * `type`: `TransactionType!` - O tipo da transação (entrada ou saída).
    * `user`: `String` - O ID do usuário associado à transação.
    * `value`: `Float!` - O valor da transação.
* **PaginatedTransactions**: Usado para resultados paginados de transações.
    * `hasMore`: `Boolean!` - Indica se há mais páginas de transações.
    * `items`: `[Transaction!]!` - A lista de transações na página atual.
    * `page`: `Float!` - O número da página atual.
    * `total`: `Float!` - O número total de transações.
    * `totalInPage`: `Float!` - O número de transações na página atual.
    * `totalPages`: `Float!` - O número total de páginas.
* **TransactionSummary**: Fornece um resumo financeiro.
    * `balance`: `Float!` - O saldo total.
    * `breakdown`: `TransactionSummaryBreakdown!` - Detalhamento das transações por tipo.
* **TransactionSummaryBreakdown**: Detalha os valores por tipo de transação.
    * `deposit`: `Float!` - Total de depósitos.
    * `payment`: `Float!` - Total de pagamentos.
    * `transfer`: `Float!` - Total de transferências.
    * `withdrawal`: `Float!` - Total de saques.
* **DateTimeISO**: Scalar para representação de data e hora em formato ISO 8601 (UTC).

### Inputs

* **LoginInput**: Usado para a operação de login.
    * `email`: `String!` - O e-mail do usuário.
    * `password`: `String!` - A senha do usuário.
* **UserInput**: Usado para a operação de registro de usuário.
    * `acceptPrivacy`: `Boolean!` - Indicação de aceitação da política de privacidade.
    * `email`: `String!` - O e-mail do novo usuário.
    * `name`: `String!` - O nome do novo usuário.
    * `password`: `String!` - A senha do novo usuário.
* **UserUpdateInput**: Usado para atualizar os dados do usuário.
    * `acceptPrivacy`: `Boolean` - Opcional, para atualizar a aceitação da política de privacidade.
    * `email`: `String` - Opcional, para atualizar o e-mail.
    * `name`: `String` - Opcional, para atualizar o nome.
    * `password`: `String` - Opcional, para atualizar a senha.
* **TransactionInput**: Usado para criar uma nova transação.
    * `alias`: `String` - Opcional, um alias para a transação.
    * `date`: `String!` - A data da transação.
    * `desc`: `TransactionDesc!` - A descrição da transação.
    * `type`: `TransactionType!` - O tipo da transação.
    * `user`: `String` - Opcional, o ID do usuário associado.
    * `value`: `Float!` - O valor da transação.
* **TransactionUpdateInput**: Usado para atualizar uma transação existente.
    * `alias`: `String` - Opcional, para atualizar o alias.
    * `date`: `String` - Opcional, para atualizar a data.
    * `desc`: `TransactionDesc` - Opcional, para atualizar a descrição.
    * `type`: `TransactionType` - Opcional, para atualizar o tipo.
    * `value`: `Float` - Opcional, para atualizar o valor.

### Enums

* **TransactionDesc**: Descrição da transação.
    * `deposit`
    * `payment`
    * `transfer`
    * `withdrawal`
* **TransactionType**: Tipo da transação.
    * `inflow` (entrada)
    * `outflow` (saída)

## 🚀 Queries

As queries são usadas para buscar dados da API.

### `me`

Retorna os dados do usuário autenticado.

```graphql
query {
  me {
    _id
    name
    email
    acceptPrivacy
    createdAt
    updatedAt
  }
}
```

**Parâmetros:** Nenhum.
**Retorno:** Um objeto `User` contendo os detalhes do usuário logado, ou `null` se não houver usuário autenticado.

### `transaction`

Retorna uma transação específica pelo seu ID.

```graphql
query Transaction($id: ID!) {
  transaction(id: $id) {
    _id
    alias
    date
    desc
    type
    value
    user
  }
}
```

**Variáveis de Query:**
* `id`: `ID!` - O ID único da transação.

**Retorno:** Um objeto `Transaction` se encontrado, ou `null`.

### `transactions`

Retorna uma lista paginada de transações do usuário autenticado.

```graphql
query Transactions($limit: Int, $page: Int) {
  transactions(limit: $limit, page: $page) {
    hasMore
    items {
      _id
      alias
      date
      desc
      type
      value
      user
    }
    page
    total
    totalInPage
    totalPages
  }
}
```

**Variáveis de Query:**
* `limit`: `Int` - Opcional, o número máximo de itens por página (padrão: 10).
* `page`: `Int` - Opcional, o número da página a ser retornada (padrão: 1).

**Retorno:** Um objeto `PaginatedTransactions`.

### `getTransactionSummary`

Retorna um resumo financeiro do usuário, incluindo saldo e detalhamento por tipo de transação.

```graphql
query {
  getTransactionSummary {
    balance
    breakdown {
      deposit
      payment
      transfer
      withdrawal
    }
  }
}
```

**Parâmetros:** Nenhum.
**Retorno:** Um objeto `TransactionSummary`.

## 💡 Mutations

As mutations são usadas para modificar dados no servidor.

### `login`

Realiza o login de um usuário e retorna um token de autenticação.

```graphql
mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    user {
      _id
      name
      email
    }
  }
}
```

**Variáveis de Mutation:**
* `input`: `LoginInput!` - Um objeto com o `email` e `password` do usuário.

**Retorno:** Um objeto `AuthPayload` contendo o `token` JWT e os detalhes do `user`.

### `register`

Registra um novo usuário no sistema.

```graphql
mutation Register($input: UserInput!) {
  register(input: $input) {
    token
    user {
      _id
      name
      email
    }
  }
}
```

**Variáveis de Mutation:**
* `input`: `UserInput!` - Um objeto com `name`, `email`, `password` e `acceptPrivacy`.

**Retorno:** Um objeto `AuthPayload` contendo o `token` JWT e os detalhes do `user` recém-criado.

### `updateUser`

Atualiza os dados do usuário autenticado.

```graphql
mutation UpdateUser($input: UserUpdateInput!) {
  updateUser(input: $input) {
    _id
    name
    email
    acceptPrivacy
  }
}
```

**Variáveis de Mutation:**
* `input`: `UserUpdateInput!` - Um objeto com os campos a serem atualizados (opcionais: `name`, `email`, `password`, `acceptPrivacy`).

**Retorno:** O objeto `User` atualizado.

### `deleteUser`

Deleta o usuário autenticado.

```graphql
mutation {
  deleteUser
}
```

**Parâmetros:** Nenhum.
**Retorno:** `Boolean!` - `true` se o usuário foi deletado com sucesso, `false` caso contrário.

### `validatePassword`

Valida a senha do usuário autenticado.

```graphql
mutation ValidatePassword($password: String!) {
  validatePassword(password: $password)
}
```

**Variáveis de Mutation:**
* `password`: `String!` - A senha a ser validada.

**Retorno:** `Boolean!` - `true` se a senha for válida, `false` caso contrário.

### `createTransaction`

Cria uma nova transação para o usuário autenticado.

```graphql
mutation CreateTransaction($input: TransactionInput!) {
  createTransaction(input: $input) {
    _id
    alias
    date
    desc
    type
    value
    user
  }
}
```

**Variáveis de Mutation:**
* `input`: `TransactionInput!` - Um objeto com os detalhes da nova transação (`date`, `desc`, `type`, `value`, `alias` opcional, `user` opcional).

**Retorno:** O objeto `Transaction` criado.

### `updateTransaction`

Atualiza uma transação existente.

```graphql
mutation UpdateTransaction($id: ID!, $input: TransactionUpdateInput!) {
  updateTransaction(id: $id, input: $input) {
    _id
    alias
    date
    desc
    type
    value
    user
  }
}
```

**Variáveis de Mutation:**
* `id`: `ID!` - O ID da transação a ser atualizada.
* `input`: `TransactionUpdateInput!` - Um objeto com os campos a serem atualizados (opcionais: `alias`, `date`, `desc`, `type`, `value`).

**Retorno:** O objeto `Transaction` atualizado.

### `deleteTransaction`

Deleta uma transação específica pelo seu ID.

```graphql
mutation DeleteTransaction($id: ID!) {
  deleteTransaction(id: $id)
}
```

**Variáveis de Mutation:**
* `id`: `ID!` - O ID da transação a ser deletada.

**Retorno:** `Boolean!` - `true` se a transação foi deletada com sucesso, `false` caso contrário.