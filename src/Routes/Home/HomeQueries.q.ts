import { gql } from "apollo-boost";

export const REQUEST_COUPLE = gql`
  mutation requestCouple {
    RequestCouple {
      ok
      error
      user {
        id
        coupleId
      }
      couple {
        id
        status
        users {
          id
          name
        }
      }
    }
  }
`;

export const FIND_COUPLE = gql`
  mutation findCouple {
    FindCouple {
      ok
      error
      user {
        id
        coupleId
      }
      couple {
        id
        status
        users {
          id
          name
          gender
        }
      }
    }
  }
`

export const CANCEL_COUPLE = gql`
  mutation cancelCouple($coupleId: Int!) {
    ChangeCouple(
      coupleId: $coupleId
      status: CANCELED
    ) {
      ok
      error
      user{
        id
      }
      coupleId
    }
  }
`

export const GET_MY_COUPLE = gql`
  query getMyCouple {
    GetMyCouple {
      ok
      error
      couple {
        id
        status
        users {
          id
          name
          gender
        }
      }
    }
  }
`