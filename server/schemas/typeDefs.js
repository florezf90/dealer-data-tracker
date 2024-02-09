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
firstName: String
lastName: String
email: String
createdAt: String
reports: [Report]
}

type Report {
_id: ID
dealerId: String
handsDealt: Int
promotionTaken: Int
moneyTaken: Int
createdAt: String
}

type Query {
user(email: String!): User
dealer(_id: ID!): Dealer
me: User
dealers: [Dealer]
# Add this line to define the dealers query
}

type Mutation {
addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
login(email: String!, password: String!): Auth
addDealer(firstName: String!, lastName: String!, email: String!): Dealer!
removeDealer(_id: ID!): Dealer
addReport( dealerId: String!, handsDealt: Int!, promotionTaken: Int!, moneyTaken: Int! ):Report
# Add other mutation fields here
}
`;
module.exports = typeDefs;