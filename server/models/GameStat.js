const { Schema, model } = require("mongoose");

const gameStatSchema = new Schema({
    name: {
        type: String,
        required: true,
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
    },
    twoBlocks: {
        type: Number,
        required: true,
    },
    threeBlocks: {
        type: Number,
        required: true,
    },
    steals: {
        type: Number,
        required: true,
    },
    turnOvers: {
        type: Number,
        required: true,
    },
},
{
    toObject: {
        virtuals: true,
    },

    id: false,
});

gameStatSchema.virtual('twoPercentage').get(function () {
    let numb = this.twosMade / this.twoAttempts;

    numb = Math.round(numb * 1000)/1000;

    return numb;
});

gameStatSchema.virtual('threePercentage').get(function () {
    let numb;
    
    if(this.threeAttempts > 0){
        numb = this.threesMade / this.threeAttempts;
    }else{
        numb = 0;
    }

    numb = Math.round(numb * 1000)/1000;

    return numb;
});

gameStatSchema.virtual('attemptTwoPercentage').get(function () {
    let numb = this.twoAttempts / (this.twoAttempts + this.threeAttempts);

    numb = Math.round(numb * 1000)/1000;

    return numb;
});

gameStatSchema.virtual('attemptThreePercentage').get(function () {
    let numb = this.threeAttempts / (this.twoAttempts + this.threeAttempts);

    numb = Math.round(numb * 1000)/1000;

    return numb;
});

gameStatSchema.virtual('pointsPerGame').get(function () {
    let numb = this.threesMade*3 + this.twosMade*2;

    numb = Math.round(numb * 10000)/10000;

    return numb;
});

gameStatSchema.virtual('totalRebounds').get(function () {
    let numb = this.offensiveRebounds + this.defensiveRebounds;

    numb = Math.round(numb * 10000)/10000;

    return numb;
});

gameStatSchema.virtual('totalBlocks').get(function () {
    let numb = this.twoBlocks + this.threeBlocks;

    numb = Math.round(numb * 10000)/10000;

    return numb;
});

const GameStat = model("GameStat", gameStatSchema);

module.exports = GameStat;