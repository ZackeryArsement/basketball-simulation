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

export const QUERY_PLAYER = gql`
query player {
    player {
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
    }
}
`