const typeDefs = `
type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    employees: [ Employee ]
}
type Auth {
    token: ID!
    user: User
}
type Employee{
    firstName: String
    lastName: String
    email: String
    reports: [ Report ]
}
type Report {
    employeeId: Int
    handsDealt: Int
    promotionTaken: Int
    moneyTaken: Int
    date: String
}
type Query {
    profile(profileId: ID!): User
    me: User
}
type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    Employees:[Employee]
    Reports:[Report]
}
`;
module.exports = typeDefs;