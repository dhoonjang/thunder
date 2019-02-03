import { gql } from "apollo-boost";

export const SIGN_UP = gql`
  mutation signUp($email: String!, $name: String!, $password: String!, $gender: String!) {
    SignUp(email: $email, name: $name, password: $password, gender: $gender) {
      ok
      error
      token
    }
  }
`;