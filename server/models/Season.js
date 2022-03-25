const { Schema, model } = require("mongoose");

const seasonSchema = new Schema({
    games: [{
        type: Schema.Types.ObjectId,
        ref: 'Game'
    }],
});

const Season = model("Season", seasonSchema);

module.exports = Season;