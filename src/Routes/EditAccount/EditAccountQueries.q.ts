import { gql } from "apollo-boost";

export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $name: String
    $gender: String
    $age: Int
    $email: String
    $password: String
  ) {
    UpdateMyProfile(
      name: $name
      age: $age
      email: $email
      gender: $gender
      password: $password
    ) {
      ok
      error
    }
  }
`;