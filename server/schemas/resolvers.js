const { AuthenticationError } = require("apollo-server-express");
const { User, Game, GameStat, Season, Player, UserPlayer} = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (parent, { username }) => {
            return User.findOne({ username });
        },
        players: async () => {
            return Player.find();
        },
        userPlayerGames: async (parent, { name }, context) => {
            if (context.user){
                const userPlayer = await UserPlayer.findOne({ name: name, userId: context.user._id })
                .populate({
                    path: 'gameStats', 
                    options: {
                        limit: 30
                    }
                })
                .limit(30)
                
                return userPlayer;
            }

            throw new AuthenticationError("You need to be logged in!");
        },
        userTeam: async (parent, args, context) => {
            if (context.user){
                let team = await User.findById({ _id: context.user._id })
                .populate({
                    path: 'team',
                    populate: {
                        path: 'playerStat',
                        model: 'Player'
                    }
                })

                return team
            }

            throw new AuthenticationError("You need to be logged in!");
        },
        userGames: async (parent, args, context) => {
            if (context.user){
                let games = await Game.find({ $or: [
                    {user1: { $in: context.user._id }},
                    {user2: { $in: context.user._id }}
                    ] 
                })
                .sort({ _id: -1})
                .limit(30)
                .populate({
                    path: 'user1',
                    model: 'User'
                })
                .populate({
                    path: 'user2',
                    model: 'User'
                })
                .populate('team1')
                .populate('team2');

                return games
            }

            throw new AuthenticationError("You need to be logged in!");
        },
        topWinUsers: async (parent, args, context) => {
            if (context.user){
                const winners = await User.find({ wins: { $gte: 20 }}).sort({wins: -1}).limit(50)

                return winners
            }

            throw new AuthenticationError("You need to be logged in!");
        },
        topPercentageUsers: async (parent, args, context) => {
            if (context.user){
                const winners = await User.find({ wins: { $gte: 20 }})
                await winners.sort((a,b) => (a.winPercentage < b.winPercentage) ? 1 : ((b.winPercentage < a.winPercentage) ? -1 : 0))

                if(winners.length > 50){
                    winners.length = 50;
                }

                return winners
            }

            throw new AuthenticationError("You need to be logged in!");
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });
      
            if (!user) {
              throw new AuthenticationError("No user found with this username");
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError("Incorrect credentials");
            }
            console.log("-----------------")
            console.log(user)
            const token = signToken(user);
      
            return { token, user };
        },
        recruitPlayer: async (parent, { id, name }, context) => {
            const player = await Player.findOne({ _id: id });

            const userPlayer = await UserPlayer.findOne(
                { userId: context.user._id, playerStat: player, name: name },
                );

            if(userPlayer === null){
                const userPlayerNew = await UserPlayer.create(
                    { userId: context.user._id, playerStat: player, name: name },
                    );
    
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { team: await userPlayerNew }},
                    { new: true });

                return user
            } else {
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { team: await userPlayer }},
                    { new: true });
    
                return user
            }
        },
        clearTeam: async (parent, { id }, context) => {
            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $set: { team: [] }},
                { new: true }
            )
            return user
        },
        addGame: async (parent, { user1, user2, ai, score1, score2 }, context) => {
            // If you have 30 games saved then delete the oldest game and all the stats in it
            let gameList = await Game.find({ $or: [
                {user1: { $in: context.user._id }},
                {user2: { $in: context.user._id }}
                ] 
            })

            if(gameList.length > 29){
                let excess = gameList.length - 29;
                let newArray = gameList.slice(0,excess)

                for(let i=0; i<excess; i++){
                    let reverseIndex = (excess-1)-i;
                    for(let i=0; i<5; i++){
                        const game1 = await GameStat.findOne({ _id: { $in: newArray[reverseIndex].team1[i]}}).remove()
                        const game2 = await GameStat.findOne({ _id: { $in: newArray[reverseIndex].team2[i]}}).remove()
                   }
   
                   await newArray[(excess-1)-i].remove()
                }
            }

            let user1Object;

            if(score1 > score2){
                user1Object = await User.findOneAndUpdate(
                    { username: user1 },
                    { $inc: {wins: 1}}
                );
            } else {
                user1Object = await User.findOneAndUpdate(
                    { username: user1 },
                    { $inc: {losses: 1}}
                );
            }


            if(ai){
                const game = await Game.create(
                    { user1: user1Object, ai: ai, score1: score1, score2: score2 }
                )
                return game
            } else{
                const user2Object = User.findOneAndUpdate({username: user2});

                constgame = await Game.create(
                    { user1: user1Object, user2: user2Object, ai: ai, score1: score1, score2: score2}
                )


                return game
            }

        },
        addStats: async (parent, { gameId, team, name, twoAttempts, threeAttempts, twosMade, threesMade, offensiveRebounds, defensiveRebounds, assists }, context) => {
            const gameStat = await GameStat.create(
                {   
                    name: name, 
                    twoAttempts: twoAttempts, 
                    threeAttempts: threeAttempts,
                    twosMade: twosMade,
                    threesMade: threesMade,
                    offensiveRebounds: offensiveRebounds,
                    defensiveRebounds: defensiveRebounds,
                    assists: assists
                }
            )

            if(team === 1){
                const userPlayer = await UserPlayer.findOneAndUpdate(
                    { name: name, userId: context.user._id},
                    { $addToSet: { gameStats: gameStat }},
                    { new: true}
                )
            }

            const game = await Game.findOneAndUpdate(
                { _id: gameId},
                { $addToSet: { [`team${team}`]: gameStat }},
                { new: true}
            );

            return game
        },
    },
};

module.exports = resolvers;