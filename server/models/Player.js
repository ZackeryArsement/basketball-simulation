const { Schema, model } = require("mongoose");

const playerSchema = new Schema({
    userId: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    twoAttempts: {
        type: Number,
        required: true,
    },
    threeAttempts: {
        type: Number,
        required: true,
    },
    twosMade: {
        type: Number,
        required: true,
    },
    threesMade: {
        type: Number,
        required: true,
    },
    offensiveRebounds: {
        type: Number,
        required: true,
    },
    defensiveRebounds: {
        type: Number,
        required: true,
    },
    assists: {
        type: Number,
        required: true,
    }
},
{
    toJSON: {
        virtuals: true,
    },

    id: false,
});

playerSchema.virtual('twoPercentage').get(function () {
    let numb = this.twosMade / this.twoAttempts;
    return numb;
});

playerSchema.virtual('threePercentage').get(function () {
    let numb = this.threesMade / this.threeAttempts;
    return numb;
});

playerSchema.virtual('attemptTwoPercentage').get(function () {
    let numb = this.twoAttempts / (this.twoAttempts + this.threeAttempts);
    return numb;
});

playerSchema.virtual('attemptThreePercentage').get(function () {
    let numb = this.threeAttempts / (this.twoAttempts + this.threeAttempts);
    return numb;
});

const Player = model("Player", playerSchema);

module.exports = Player;