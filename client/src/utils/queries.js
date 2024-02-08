import { gql } from '@apollo/client';

export const GET_DEALERS = gql`
  query GetDealers($email: String!) {
    user(email: $email) {
      employees {
        _id
        firstName
        lastName
        email
        createdAt
      }
    }
  }
  `
// export const GET_DEALER_PERFORMANCE = gql`
//   query GetDealerPerformance {
//     dealerPerformance {
//       id
//       name
//       handsDealt
//       promotionalDrops
//       errors
//     }
//   }
// `