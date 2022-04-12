import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $password: String!
    $email: String!
  ) {
    addUser(
      username: $username
      password: $password
      email: $email
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const RECRUIT_PLAYER = gql`
mutation recruitPlayer($id: String!, $name: String!){
    recruitPlayer(id: $id, name: $name){
      team{
        userId
        playerStat{
          _id
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
`;

export const CLEAR_TEAM = gql`
mutation clearTeam($id: String!){
  clearTeam(id: $id){
    _id
  }
}
`

export const ADD_GAME = gql`
mutation addGame($user1: String!, $user2: String, $score1: Float!, $score2: Float!, $ai: Boolean!){
  addGame(user1: $user1, user2: $user2, score1: $score1, score2: $score2, ai: $ai){
    _id
  }
}
`

export const ADD_STATS = gql`
mutation addStats(
  $gameId: String!, 
  $team: Float!, 
  $name: String!, 
  $twoAttempts: Float!, 
  $threeAttempts: Float!, 
  $twosMade: Float!, 
  $threesMade: Float!, 
  $offensiveRebounds: Float!, 
  $defensiveRebounds: Float!, 
  $assists: Float!
  ) {
    addStats(
      gameId: $gameId, 
      team: $team, 
      name: $name, 
      twoAttempts: $twoAttempts, 
      threeAttempts: $threeAttempts, 
      twosMade: $twosMade, 
      threesMade: $threesMade, 
      offensiveRebounds: $offensiveRebounds, 
      defensiveRebounds: $defensiveRebounds, 
      assists: $assists
      ) {
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