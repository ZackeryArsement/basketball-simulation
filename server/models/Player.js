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
    toObject: {
        virtuals: true,
    },

    id: false,
});

playerSchema.virtual('twoPercentage').get(function () {
    let numb = this.twosMade / this.twoAttempts;

    numb = Math.round(numb * 1000)/1000;

    return numb;
});

playerSchema.virtual('threePercentage').get(function () {
    let numb;
    
    if(this.threeAttempts > 0){
        numb = this.threesMade / this.threeAttempts;
    }else{
        numb = 0;
    }

    numb = Math.round(numb * 1000)/1000;

    return numb;
});

playerSchema.virtual('attemptTwoPercentage').get(function () {
    let numb = this.twoAttempts / (this.twoAttempts + this.threeAttempts);

    numb = Math.round(numb * 1000)/1000;

    return numb;
});

playerSchema.virtual('attemptThreePercentage').get(function () {
    let numb = this.threeAttempts / (this.twoAttempts + this.threeAttempts);

    numb = Math.round(numb * 1000)/1000;

    return numb;
});

playerSchema.virtual('pointsPerGame').get(function () {
    let numb = this.threesMade*3 + this.twosMade*2;

    numb = Math.round(numb * 10000)/10000;

    return numb;
});

playerSchema.virtual('totalRebounds').get(function () {
    let numb = this.offensiveRebounds + this.defensiveRebounds;

    numb = Math.round(numb * 10000)/10000;

    return numb;
});

const Player = model("Player", playerSchema);

module.exports = Player;