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