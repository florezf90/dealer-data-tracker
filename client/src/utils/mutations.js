import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;
export const ADD_DEALER = gql`
mutation AddDealer($firstName: String!, $lastName: String!, $email: String!) {
  addDealer(firstName: $firstName, lastName: $lastName, email: $email) {
    firstName
    lastName
    email
  }
}
`;//TODO add way to tie to user (id or email or something)
