const typeDefs = `
type User {
_id: ID
firstName: String
lastName: String
email: String
dealers: [Dealer] 
}


type Auth {
token: ID!
user: User
}

type Dealer {
_id: ID
user: User
firstName: String
lastName: String
email: String
createdAt: String
reports: [Report]
}

type Report {
dealerId: Int
handsDealt: Int
promotionTaken: Int
moneyTaken: Int
date: String
}

type Query {
user(email: String!): User
me: User
dealers: [Dealer]  
}

type Mutation {
addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
login(email: String!, password: String!): Auth
addDealer(userId: ID!firstName: String!, lastName: String!, email: String!): Dealer!
}
`;
module.exports = typeDefs;