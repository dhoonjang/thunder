import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation logIn($email: String!, $password: String!) {
    LogIn(email: $email, password: $password) {
      ok
      error
      token
    }
  }
`;