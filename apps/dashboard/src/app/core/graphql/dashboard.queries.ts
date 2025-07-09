import { gql } from 'apollo-angular';

// Query to get transaction summary (balance and breakdown)
export const GET_TRANSACTION_SUMMARY = gql`
  query GetTransactionSummary {
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
`;
