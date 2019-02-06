import { gql } from "apollo-boost";

export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $name: String
    $gender: String
    $age: String
    $email: String
    $password: String
    $introduction: String
  ) {
    UpdateMyProfile(
      name: $name
      age: $age
      email: $email
      gender: $gender
      password: $password
      introduction: $introduction
    ) {
      ok
      error
    }
  }
`;