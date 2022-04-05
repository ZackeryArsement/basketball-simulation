const { Schema, model } = require("mongoose");
const Player = require('./Player');

const gameSchema = new Schema({
    user1: {
        type: String,
        required: true
    },
    user2: {
        type: String,
        required: true
    },
    team1: [{
        type: Schema.Types.ObjectId,
        ref: 'Player'
    }],
    team2: [{
        type: Schema.Types.ObjectId,
        ref: 'Player'
    }],
});

const Game = model("Game", gameSchema);

module.exports = Game;