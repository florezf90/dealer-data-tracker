const typeDefs = `
type User {
_id: ID
firstName: String
lastName: String
email: String
employees: [Dealer]
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
dealerId: Int
handsDealt: Int
promotionTaken: Int
moneyTaken: Int
}

type Query {
user(email: String!): User
me: User
dealers: [Dealer]   # Add this line to define the dealers query
}

type Mutation {
addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
login(email: String!, password: String!): Auth
addDealer(firstName: String!, lastName: String!, email: String!): Dealer!
addReport( dealerId: Int!, handsDelt: Int!, promotionTaken: Int!, moneyTaken: Int! ):Report
# Add other mutation fields here
}
`;
module.exports = typeDefs;