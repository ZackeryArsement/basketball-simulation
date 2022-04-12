const { Schema, model } = require("mongoose");
const Player = require('./Player');

const gameSchema = new Schema({
    user1: {
        type: Schema.Types.ObjectId,
        required: true
    },
    user2: {
        type: Schema.Types.ObjectId,
    },
    score1: {
        type: Number,
        required: true,
    },
    score2: {
        type: Number,
        required: true,
    },
    ai: {
        type: Boolean,
        required: true
    },
    team1: [{
        type: Schema.Types.ObjectId,
        ref: 'GameStat'
    }],
    team2: [{
        type: Schema.Types.ObjectId,
        ref: 'GameStat'
    }],
});

const Game = model("Game", gameSchema);

module.exports = Game;