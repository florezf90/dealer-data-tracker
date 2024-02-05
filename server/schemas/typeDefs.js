const typeDefs = `
type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    employees: [employee]
}
type Auth {
    token: ID!
    user: User
}
type Employee{
    firstName: String
    lastName: String
    email: String
    reports: [report]
}
type Report {
    employeeId: Int
    handsDealt: String
    promotionTaken: String
    moneyTaken: String
    date: Date
}
type Query {
    profile(profileId: ID!): User
    me: User
}
type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
}
`;
module.exports = typeDefs;