const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
    _id: ID
    username: String
    password: String
    email: String
    team: [Player]
}

type Player {
    _id: ID
    userId: String
    name: String
    twoAttempts: Float
    threeAttempts: Float
    twosMade: Float
    threesMade: Float
    offensiveRebounds: Float
    defensiveRebounds: Float
    assists: Float
}

type Game {
    _id: ID
    user1: String
    user2: String
    team1: [Player]
    team2: [Player]
}

type Season {
    _id: ID
    games: [Game]
}

type Auth {
    token: ID!
    user: User
}

type Query {
    user(username: String!): User
    users: [User]
    players: [Player]
}

type Mutation {
    addUser(username: String!, password: String!, email: String!): Auth
    login(username: String!, password: String!): Auth
    recruitPlayer(id: String!) : User
}
`

module.exports = typeDefs;