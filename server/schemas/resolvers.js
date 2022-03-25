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
              throw new AuthenticationError("No user found with this email address");
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
            const player = await Player.findOne( {_id: id} );
            const user = await User.findOneAndUpdate(
                { _id: context.user._id},
                { $addToSet: { team: player}},
                { new: true}
            )

            return user
        },
    },
};

module.exports = resolvers;