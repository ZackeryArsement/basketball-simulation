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
        // player: async (parent, { name }, context) => {
        //     return Player.findOne({ name: name, userId: context.user._id });
        // },
        userTeam: async (parent, args, context) => {
            if (context.user){
                let team = await User.findById({_id: context.user._id}).populate({
                    path: 'team',
                    populate: {
                        path: 'playerStat',
                        model: 'Player'
                    }
                })
                return team
            }

            throw new AuthenticationError("You need to be logged in!");
        }
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

            const userP = async () => {
                let UP = await UserPlayer.findOne(
                    { userId: context.user._id, playerStat: player, name: name },
                    );

                if(UP !== null){
                    return UP;
                } else{
                    return await UserPlayer.create(
                        { userId: context.user._id, playerStat: player, name: name },
                        { new: true }
                        );
                }
            }

            const userPlayer = await userP();
            console.log(userPlayer);

            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { team: userPlayer }},
                { new: true }
            )
            return user
        },
        clearTeam: async (parent, { id }, context) => {
            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $set: { team: [] }},
                { new: true }
            )
            return user
        },
    },
};

module.exports = resolvers;