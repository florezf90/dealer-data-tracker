import { gql } from '@apollo/client';

export const GET_DEALERS = gql`
  query GetDealers($email: String!) {
    user(email: $email) {
      dealers {
        _id
        firstName
        lastName
        email
        createdAt
      }
    }
  }
  `
export const GET_DEALER = gql`
  query GetDealer($_id: ID!) {
    dealer(_id: $_id){
      firstName
      lastName
      reports {
        dealerId
        handsDealt
        promotionTaken
        moneyTaken
      }
    }
  }
`;