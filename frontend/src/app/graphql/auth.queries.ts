import { gql } from 'apollo-angular';

export const LOGIN = gql`
  query Login($input: LoginInput!) {
    login(input: $input) {
      message
      token
      user { _id username email }
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      message
      token
      user { _id username email }
    }
  }
`;