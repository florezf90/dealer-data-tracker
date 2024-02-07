const typeDefs = `
type User {
    _id: ID
    firstName: String
    lastName: String
    email: String

}
type Auth {
    token: ID!
    user: User
}
type Dealer{
    firstName: String
    lastName: String
    email: String
    reports: [ Report ]
}
type Report {
    Dealer: Int
    handsDealt: Int
    promotionTaken: Int
    moneyTaken: Int
    date: String
}
type Query {
    user(email: String!): User
    me: User
}
type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addDealer(supervisorId: ID!, firstName: String!, lastName: String!, email: String!): Dealer
}
`;
module.exports = typeDefs;