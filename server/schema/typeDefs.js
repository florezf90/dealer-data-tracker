const typeDefs = `
type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    employees: [Employee]
}
type Auth {
    token: ID!
    profile: Profile
}
type Query {
    profile(profileId: ID!): Profile
    me: Profile
}
`;
module.exports = typeDefs;