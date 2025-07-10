# 🚀 Bytebank API GraphQL - Usage Documentation

Welcome to the Bytebank GraphQL API usage documentation. This guide details how to interact with the API, including all available queries and mutations, and the expected data for each operation.

The API is built with **Node.js**, **TypeScript**, **Apollo Server**, **Express**, and **MongoDB**, offering user authentication and financial transaction management features. Authentication is performed via JSON Web Tokens (JWT), and protected routes are accessible only with a valid token.

## ✨ Key Features

- **User Authentication**: Secure registration and login with JWT.
- **Transaction Management**: CRUD (Create, Read, Update, Delete) operations for financial transactions.
- **Financial Summary**: Endpoint to get the current balance and a summary of transactions.
- **Pagination**: Support for pagination in the transaction list.
- **Security**: Encrypted passwords and routes protected by authentication.

## 💡 API Address

The API will be available at `http://localhost:4000/graphql` when run locally.

## 🔑 Authentication

Authentication is performed via JSON Web Tokens (JWT). After logging in or registering, you will receive a `token` that must be included in the `Authorization` header of all your protected requests, in the format `Bearer <your_token>`.

Example of authorization header:

```
Authorization: Bearer your_jwt_token_here
```

## 📖 GraphQL Schema

The GraphQL API has the following types, inputs, and enums:

### Types

- **AuthPayload**: Returned in authentication operations.
  - `token`: `String!` - The JWT token for authentication.
  - `user`: `User!` - The details of the authenticated user.
- **User**: Represents a user in the system.
  - `_id`: `ID!` - The unique ID of the user.
  - `acceptPrivacy`: `Boolean!` - Indicates if the user has accepted the privacy policy.
  - `createdAt`: `DateTimeISO!` - Date and time of user creation (UTC).
  - `email`: `String!` - The user's email address.
  - `name`: `String!` - The user's name.
  - `updatedAt`: `DateTimeISO!` - Date and time of the last user update (UTC).
- **Transaction**: Represents a financial transaction.
  - `_id`: `ID!` - The unique ID of the transaction.
  - `alias`: `String` - An optional alias for the transaction.
  - `date`: `String!` - The date of the transaction.
  - `desc`: `TransactionDesc!` - The description of the transaction (deposit, payment, transfer, withdrawal).
  - `type`: `TransactionType!` - The type of the transaction (inflow or outflow).
  - `user`: `String` - The ID of the user associated with the transaction.
  - `value`: `Float!` - The value of the transaction.
- **PaginatedTransactions**: Used for paginated transaction results.
  - `hasMore`: `Boolean!` - Indicates if there are more pages of transactions.
  - `items`: `[Transaction!]!` - The list of transactions on the current page.
  - `page`: `Float!` - The current page number.
  - `total`: `Float!` - The total number of transactions.
  - `totalInPage`: `Float!` - The number of transactions on the current page.
  - `totalPages`: `Float!` - The total number of pages.
- **TransactionSummary**: Provides a financial summary.
  - `balance`: `Float!` - The total balance.
  - `breakdown`: `TransactionSummaryBreakdown!` - Breakdown of transactions by type.
- **TransactionSummaryBreakdown**: Details the values by transaction type.
  - `deposit`: `Float!` - Total deposits.
  - `payment`: `Float!` - Total payments.
  - `transfer`: `Float!` - Total transfers.
  - `withdrawal`: `Float!` - Total withdrawals.
- **DateTimeISO**: Scalar for representing date and time in ISO 8601 format (UTC).

### Inputs

- **LoginInput**: Used for the login operation.
  - `email`: `String!` - The user's email.
  - `password`: `String!` - The user's password.
- **UserInput**: Used for the user registration operation.
  - `acceptPrivacy`: `Boolean!` - Indication of acceptance of the privacy policy.
  - `email`: `String!` - The new user's email.
  - `name`: `String!` - The new user's name.
  - `password`: `String!` - The new user's password.
- **UserUpdateInput**: Used to update user data.
  - `acceptPrivacy`: `Boolean` - Optional, to update the acceptance of the privacy policy.
  - `email`: `String` - Optional, to update the email.
  - `name`: `String` - Optional, to update the name.
  - `password`: `String` - Optional, to update the password.
- **TransactionInput**: Used to create a new transaction.
  - `alias`: `String` - Optional, an alias for the transaction.
  - `date`: `String!` - The date of the transaction.
  - `desc`: `TransactionDesc!` - The description of the transaction.
  - `type`: `TransactionType!` - The type of the transaction.
  - `user`: `String` - Optional, the ID of the associated user.
  - `value`: `Float!` - The value of the transaction.
- **TransactionUpdateInput**: Used to update an existing transaction.
  - `alias`: `String` - Optional, to update the alias.
  - `date`: `String` - Optional, to update the date.
  - `desc`: `TransactionDesc` - Optional, to update the description.
  - `type`: `TransactionType` - Optional, to update the type.
  - `value`: `Float` - Optional, to update the value.

### Enums

- **TransactionDesc**: Transaction description.
  - `deposit`
  - `payment`
  - `transfer`
  - `withdrawal`
- **TransactionType**: Transaction type.
  - `inflow`
  - `outflow`

## 🚀 Queries

Queries are used to fetch data from the API.

### `me`

Returns the data of the authenticated user.

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

**Parameters:** None.
**Returns:** A `User` object containing the details of the logged-in user, or `null` if there is no authenticated user.

### `transaction`

Returns a specific transaction by its ID.

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

**Query Variables:**

- `id`: `ID!` - The unique ID of the transaction.

**Returns:** A `Transaction` object if found, or `null`.

### `transactions`

Returns a paginated list of transactions for the authenticated user.

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

**Query Variables:**

- `limit`: `Int` - Optional, the maximum number of items per page (default: 10).
- `page`: `Int` - Optional, the page number to be returned (default: 1).

**Returns:** A `PaginatedTransactions` object.

### `getTransactionSummary`

Returns a financial summary for the user, including balance and breakdown by transaction type.

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

**Parameters:** None.
**Returns:** A `TransactionSummary` object.

## 💡 Mutations

Mutations are used to modify data on the server.

### `login`

Logs in a user and returns an authentication token.

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

**Mutation Variables:**

- `input`: `LoginInput!` - An object with the user's `email` and `password`.

**Returns:** An `AuthPayload` object containing the JWT `token` and the `user` details.

### `register`

Registers a new user in the system.

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

**Mutation Variables:**

- `input`: `UserInput!` - An object with `name`, `email`, `password`, and `acceptPrivacy`.

**Returns:** An `AuthPayload` object containing the JWT `token` and the details of the newly created `user`.

### `updateUser`

Updates the authenticated user's data.

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

**Mutation Variables:**

- `input`: `UserUpdateInput!` - An object with the fields to be updated (optional: `name`, `email`, `password`, `acceptPrivacy`).

**Returns:** The updated `User` object.

### `deleteUser`

Deletes the authenticated user.

```graphql
mutation {
  deleteUser
}
```

**Parameters:** None.
**Returns:** `Boolean!` - `true` if the user was successfully deleted, `false` otherwise.

### `validatePassword`

Validates the authenticated user's password.

```graphql
mutation ValidatePassword($password: String!) {
  validatePassword(password: $password)
}
```

**Mutation Variables:**

- `password`: `String!` - The password to be validated.

**Returns:** `Boolean!` - `true` if the password is valid, `false` otherwise.

### `createTransaction`

Creates a new transaction for the authenticated user.

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

**Mutation Variables:**

- `input`: `TransactionInput!` - An object with the details of the new transaction (`date`, `desc`, `type`, `value`, optional `alias`, optional `user`).

**Returns:** The created `Transaction` object.

### `updateTransaction`

Updates an existing transaction.

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

**Mutation Variables:**

- `id`: `ID!` - The ID of the transaction to be updated.
- `input`: `TransactionUpdateInput!` - An object with the fields to be updated (optional: `alias`, `date`, `desc`, `type`, `value`).

**Returns:** The updated `Transaction` object.

### `deleteTransaction`

Deletes a specific transaction by its ID.

```graphql
mutation DeleteTransaction($id: ID!) {
  deleteTransaction(id: $id)
}
```

**Mutation Variables:**

- `id`: `ID!` - The ID of the transaction to be deleted.

**Returns:** `Boolean!` - `true` if the transaction was successfully deleted, `false` otherwise.
