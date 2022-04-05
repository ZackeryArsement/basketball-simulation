const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    team: [UserPlayer]
}

type Player {
    _id: ID
    name: String
    twoAttempts: Float
    threeAttempts: Float
    twosMade: Float
    threesMade: Float
    offensiveRebounds: Float
    defensiveRebounds: Float
    assists: Float
    twoPercentage: Float
    threePercentage: Float
    attemptTwoPercentage: Float
    attemptThreePercentage: Float
    pointsPerGame: Float
    totalRebounds: Float
}

type UserPlayer {
    _id: ID
    userId: String
    playerStat: Player
    name: String
    gameStats: [GameStat]
}

type GameStat {
    _id: ID
    twoAttempts: Float
    threeAttempts: Float
    twosMade: Float
    threesMade: Float
    offensiveRebounds: Float
    defensiveRebounds: Float
    assists: Float
    twoPercentage: Float
    threePercentage: Float
    attemptTwoPercentage: Float
    attemptThreePercentage: Float
    pointsPerGame: Float
    totalRebounds: Float
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
    player: Player
    userTeam: User
}

type Mutation {
    addUser(username: String!, password: String!, email: String!): Auth
    login(username: String!, password: String!): Auth
    recruitPlayer(id: String!, name: String!) : User
    clearTeam(id: String!) : User
}
`

module.exports = typeDefs;