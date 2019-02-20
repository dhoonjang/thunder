import { gql } from "apollo-boost";

export const USER_PROFILE = gql`
  query userProfile {
    GetMyProfile {
      ok
      error
      user {
        id
        name
        email
        gender
        isVerified
        isMatched
        introduction
        coupleId
        age
      }
    }
  }
`;

export const GET_PLACES = gql`
  query getPlaces {
    GetPlaces {
      ok
      error
      places {
        id
        name
        explanation
        star
        address
        lat
        lng
      }
    }
  }
`;