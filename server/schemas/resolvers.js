const { AuthenticationError } = require("apollo-server-express");
const { User, Task, Stat, Player} = require("../models");
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
        userTeam: async (parent, args, context) => {
            if (context.user){
                let team = await User.findById({_id: context.user._id}).populate('team')
                console.log(team)
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
        recruitPlayer: async (parent, { id }, context) => {
            const player = await Player.findOneAndUpdate( 
                {_id: id},
                { $set: { userId: context.user._id} },

                );
            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { team: player }},
                { new: true }
            )
            console.log('hit recruit')
            return user
        },
        clearTeam: async (parent, { id }, context) => {
            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $set: { team: [] }},
                { new: true }
            )
            console.log('Cleared')
            return user
        },
    },
};

module.exports = resolvers;