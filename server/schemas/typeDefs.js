const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    wins: Float
    losses: Float
    winPercentage: Float
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

type Game {
    _id: ID
    user1: User
    user2: User
    score1: Float
    score2: Float
    team1: [GameStat]
    team2: [GameStat]
    ai: Boolean
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
    userGames: [Game]
    userPlayerGames(name: String!): UserPlayer
    topWinUsers: [User]
    topPercentageUsers: [User]
}

type Mutation {
    addUser(username: String!, password: String!, email: String!): Auth
    login(username: String!, password: String!): Auth
    recruitPlayer(id: String!, name: String!) : User
    clearTeam(id: String!) : User
    addGame(user1: String!, user2: String, score1: Float!, score2: Float!, ai: Boolean!): Game
    addStats(gameId: String!, team: Float!, name: String!, twoAttempts: Float!, threeAttempts: Float!, twosMade: Float!, threesMade: Float!, offensiveRebounds: Float!, defensiveRebounds: Float!, assists: Float!) : GameStat
}
`

module.exports = typeDefs;