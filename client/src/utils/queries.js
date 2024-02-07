import { gql } from '@apollo/client';

export const GET_DEALERS = gql`
  query {
    dealers {
      _id
      firstName
      lastName
      email
      createdAt
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