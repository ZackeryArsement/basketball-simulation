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
        _id
        wins
        losses
        winPercentage
        team{
            _id
            userId
            playerStat{
                _id
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
            name
        }
    }
}
`

export const QUERY_USER_GAMES = gql`
query userGames {
    userGames {
        _id
        user1{
            _id
            username
        }
        user2{
            _id
            username
        }
        score1
        score2
        ai
        team1{
            _id
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
        team2{
            _id
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

export const QUERY_USER_PLAYER_GAMES = gql`
query userPlayerGames($name: String!){
    userPlayerGames(name: $name) {
        _id
        gameStats{
            _id
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

export const QUERY_USER_TOP_WINS = gql`
query topWinUsers {
    topWinUsers {
        _id
        username
        wins
        losses
        winPercentage
    }
}
`
export const QUERY_USER_TOP_WIN_PERCENTAGE = gql`
query topPercentageUsers {
    topPercentageUsers {
        _id
        username
        wins
        losses
        winPercentage
    }
}
`