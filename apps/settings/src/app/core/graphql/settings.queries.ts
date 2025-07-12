import { gql } from 'apollo-angular';

/**
 * Query to get current user data
 */
export const GET_USER_QUERY = gql`
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
`;

/**
 * Mutation to update user data
 */
export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UserUpdateInput!) {
    updateUser(input: $input) {
      _id
      name
      email
      acceptPrivacy
      createdAt
      updatedAt
    }
  }
`;

/**
 * Mutation to delete user account
 */
export const DELETE_USER_MUTATION = gql`
  mutation {
    deleteUser
  }
`;

/**
 * Mutation to validate user password
 */
export const VALIDATE_PASSWORD_MUTATION = gql`
  mutation ValidatePassword($password: String!) {
    validatePassword(password: $password)
  }
`;
