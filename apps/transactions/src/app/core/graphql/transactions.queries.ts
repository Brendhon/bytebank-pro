import { gql } from 'apollo-angular';

/**
 * Get transactions with pagination
 */
export const GET_TRANSACTIONS_QUERY = gql`
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
`;

/**
 * Create transaction mutation
 */
export const CREATE_TRANSACTION_MUTATION = gql`
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
`;

/**
 * Update transaction mutation
 */
export const UPDATE_TRANSACTION_MUTATION = gql`
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
`;

/**
 * Delete transaction mutation
 */
export const DELETE_TRANSACTION_MUTATION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id)
  }
`;
