const db = require('../config/connection');
const { Player, User } = require('../models');
const playerSeeds = require('./playerSeed.json');
const userSeeds = require('./userSeed.json');


db.once('open', async () => {
  try {
    
    await Player.deleteMany({});
    
    await User.deleteMany({});

    const play = await Player.create(playerSeeds);

    await User.create(userSeeds);

    console.log(play);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});