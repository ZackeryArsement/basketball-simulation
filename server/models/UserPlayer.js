const { Schema, model } = require("mongoose");
const Player = require('./Player');
const GameStat = require('./GameStat');

const userPlayerSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    playerStat: {
        type: Schema.Types.ObjectId,
        ref: 'Player'
    },
    name: {
        type: String,
        required: true,
    },
    gameStats: [{
        type: Schema.Types.ObjectId,
        ref: 'GameStat'
    }]
});

const UserPlayer = model("UserPlayer", userPlayerSchema);

module.exports = UserPlayer;