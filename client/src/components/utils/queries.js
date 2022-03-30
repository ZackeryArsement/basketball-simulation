import { gql } from "@apollo/client";

export const QUERY_USER = gql`
query user {
    user {
        _id
        username
        email
        team
    }
}
`

export const QUERY_PLAYERS = gql`
query players {
    players {
        _id
        userId
        name
        twoAttempts
        threeAttempts
        twosMade
        threesMade
        offensiveRebounds
        defensiveRebounds
        assists
        twoPercentage
        threePercentage
        attemptTwoPercentage
        attemptThreePercentage
        pointsPerGame
        totalRebounds
    }
}
`

export const QUERY_USER_TEAM = gql `
query userTeam {
    userTeam {
        team{
            _id
            userId
            name
            twoAttempts
            threeAttempts
            twosMade
            threesMade
            offensiveRebounds
            defensiveRebounds
            assists
            twoPercentage
            threePercentage
            attemptTwoPercentage
            attemptThreePercentage
            pointsPerGame
            totalRebounds
        }
    }
}
`