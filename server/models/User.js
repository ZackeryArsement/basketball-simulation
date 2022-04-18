const { Schema, model } = require("mongoose");
const UserPlayer = require('./UserPlayer')
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  wins: {
    type: Number,
    default: 0,
  },
  losses: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  team: [{
    type: Schema.Types.ObjectId,
    ref: 'UserPlayer'
  }],
},
{
    toObject: {
        virtuals: true,
    },

    id: false,
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('winPercentage').get(function () {
  let numb;

  if(this.wins > 0 && this.losses > 0){
    numb = this.wins / (this.wins + this.losses);

    numb = Math.round(numb * 10000)/10000;
  } else {
    numb = 0;
  }

  return numb;
});

const User = model("User", userSchema);

module.exports = User;