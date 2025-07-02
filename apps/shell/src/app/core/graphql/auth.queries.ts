import { gql } from 'apollo-angular';

/**
 * Login mutation
 */
export const LOGIN_MUTATION = gql`
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
`;

/**
 * Register mutation
 */
export const REGISTER_MUTATION = gql`
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
`;

/**
 * Current user query
 */
export const ME_QUERY = gql`
  query {
    me {
      _id
      name
      email
      acceptPrivacy
    }
  }
`;
