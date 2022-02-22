// Golden State Warriors 2015-2016
let goldenState = [
    {
        player: "Steph Curry",
        att2: 9,
        att3: 11.2,
        made2: 5.1,
        made3: 5.1,
        offReb: 0.9,
        defReb: 4.6,
        per2: null,
        per3: null,
        shootChance: null,
        chance2: null,
        chance3: null,
        chanceOffReb: null,
        chanceDefReb: null
    },
    {
        player: "Draymond Green",
        att2: 6.9,
        att3: 3.2,
        made2: 3.7,
        made3: 1.2,
        offReb: 1.7,
        defReb: 7.8,
        per2: null,
        per3: null,
        shootChance: null,
        chance2: null,
        chance3: null,
        chanceOffReb: null,
        chanceDefReb: null
    },
    {
        player: "Klay Thompson",
        att2: 9.2,
        att3: 8.1,
        made2: 4.7,
        made3: 2.5,
        offReb: 0.4,
        defReb: 3.4,
        per2: null,
        per3: null,
        shootChance: null,
        chance2: null,
        chance3: null,
        chanceOffReb: null,
        chanceDefReb: null
    },
    {
        player: "Andre Iguodala",
        att2: 3.3,
        att3: 2.4,
        made2: 1.9,
        made3: 0.8,
        offReb: 0.8,
        defReb: 3.2,
        per2: null,
        per3: null,
        shootChance: null,
        chance2: null,
        chance3: null,
        chanceOffReb: null,
        chanceDefReb: null
    },
    {
        player: "Harrison Barnes",
        att2: 6.3,
        att3: 3.2,
        made2: 3.2,
        made3: 1.2,
        offReb: 1.2,
        defReb: 3.8,
        per2: null,
        per3: null,
        shootChance: null,
        chance2: null,
        chance3: null,
        chanceOffReb: null,
        chanceDefReb: null
    },
    {
        teamName: "Golden State Warriors",
        totShots: null,
        offReb: null,
        defReb: null,
        offRebPer: null,
        defRebPer: null
    }
];

// Cleveland Caveliers 2015-2016
let clevelandCaveliers = [
    {
        player: "Lebron James",
        att2: 14.9,
        att3: 3.7,
        made2: 8.6,
        made3: 1.1,
        offReb: 1.5,
        defReb: 6,
        per2: null,
        per3: null,
        shootChance: null,
        chance2: null,
        chance3: null,
        chanceOffReb: null,
        chanceDefReb: null
    },
    {
        player: "Kyrie Irving",
        att2: 11.6,
        att3: 4.9,
        made2: 5.8,
        made3: 1.6,
        offReb: 0.8,
        defReb: 2.1,
        per2: null,
        per3: null,
        shootChance: null,
        chance2: null,
        chance3: null,
        chanceOffReb: null,
        chanceDefReb: null
    },
    {
        player: "Kevin Love",
        att2: 7,
        att3: 5.7,
        made2: 3.3,
        made3: 2.1,
        offReb: 1.9,
        defReb: 8,
        per2: null,
        per3: null,
        shootChance: null,
        chance2: null,
        chance3: null,
        chanceOffReb: null,
        chanceDefReb: null
    },
    {
        player: "J.R. Smith",
        att2: 4.4,
        att3: 6.6,
        made2: 1.9,
        made3: 2.6,
        offReb: 0.6,
        defReb: 2.3,
        per2: null,
        per3: null,
        shootChance: null,
        chance2: null,
        chance3: null,
        chanceOffReb: null,
        chanceDefReb: null
    },
    {
        player: "Tristan Thompson",
        att2: 5.1,
        att3: 0,
        made2: 3,
        made3: 0,
        offReb: 3.3,
        defReb: 5.7,
        per2: null,
        per3: null,
        shootChance: null,
        chance2: null,
        chance3: null,
        chanceOffReb: null,
        chanceDefReb: null
    },
    {
        teamName: "Cleveland Caveliers",
        totShots: null,
        offReb: null,
        defReb: null,
        offRebPer: null,
        defRebPer: null
    }
];

teamSeasonPercentage(goldenState);
teamSeasonPercentage(clevelandCaveliers);

runGame(goldenState, clevelandCaveliers, 1, 2, 3);

// Establish each players 2pt% and 3pt% 
function teamSeasonPercentage(currentTeam){
    // Go through each player on the team
    for(let playerIndex=0; playerIndex<(currentTeam.length-1); playerIndex++){
        let currentPlayer = currentTeam[playerIndex];
        let playerTotShots = currentPlayer.att2 + currentPlayer.att3;

        // Add player stats to team total stats
        currentTeam[currentTeam.length-1].totShots = currentTeam[currentTeam.length-1].totShots + playerTotShots;
        currentTeam[currentTeam.length-1].offReb = currentTeam[currentTeam.length-1].offReb + currentPlayer.offReb;
        currentTeam[currentTeam.length-1].defReb = currentTeam[currentTeam.length-1].defReb + currentPlayer.defReb;

        // Add 2pt%
        currentPlayer.per2 = currentPlayer.made2/currentPlayer.att2;

        // Add 3pt%
        currentPlayer.per3 = currentPlayer.made3/currentPlayer.att3;

        // Add chance to shoot a 2pt
        currentPlayer.chance2 = currentPlayer.att2 / playerTotShots;

        // Add chance to shoot a 3pt
        currentPlayer.chance3 = currentPlayer.att3 / playerTotShots;

        // Round every percent to the nearest 1000th place
        currentPlayer.per2 = Math.round(currentPlayer.per2 * 1000)/1000;
        currentPlayer.per3 = Math.round(currentPlayer.per3 * 1000)/1000;
        currentPlayer.chance2 = Math.round(currentPlayer.chance2 * 1000)/1000;
        currentPlayer.chance3 = Math.round(currentPlayer.chance3 * 1000)/1000;
    }

    // Now that we summed up each teams total shot, check each players chance to shoot
    for(let playerIndex=0; playerIndex<(currentTeam.length-1); playerIndex++){
        let currentPlayer = currentTeam[playerIndex];
        let playerTotShots = currentPlayer.att2 + currentPlayer.att3;

        // Chance that this player shoots a shot
        currentPlayer.shootChance = playerTotShots / currentTeam[currentTeam.length-1].totShots;

        // Chance a player gets offensive rebound
        currentPlayer.chanceOffReb = currentPlayer.offReb / currentTeam[currentTeam.length-1].offReb;

        // Chance a player gets defensive roubound
        currentPlayer.chanceDefReb = currentPlayer.defReb / currentTeam[currentTeam.length-1].defReb;

        // Round every percent to the nearest 1000th places
        currentPlayer.shootChance = Math.round(currentPlayer.shootChance * 1000)/1000;
        currentPlayer.chanceOffReb = Math.round(currentPlayer.chanceOffReb * 1000)/1000;
        currentPlayer.chanceDefReb = Math.round(currentPlayer.chanceDefReb * 1000)/1000;
    }
}

// Get stats related to specific team match up
function playerGamePercentage(team1, team2){
    // The chance that each team gets a rebound, depending on their possession
    team1[team1.length-1].defRebPer = team1[team1.length-1].defReb / (team1[team1.length-1].defReb  + team2[team2.length-1].offReb);
    team2[team2.length-1].defRebPer = team2[team2.length-1].defReb  / (team2[team2.length-1].defReb + team1[team1.length-1].offReb);
    team1[team1.length-1].offRebPer = team1[team1.length-1].offReb / (team1[team1.length-1].offReb + team2[team2.length-1].defReb);
    team2[team2.length-1].offRebPer = team2[team2.length-1].offReb / (team2[team2.length-1].offReb + team1[team1.length-1].defReb );

    // Round each stat to nearest 1000th
    team1[team1.length-1].defRebPer  = Math.round(team1[team1.length-1].defRebPer * 1000)/1000;
    team2[team2.length-1].defRebPer  = Math.round(team2[team2.length-1].defRebPer * 1000)/1000;
    team1[team1.length-1].offRebPer = Math.round(team1[team1.length-1].offRebPer * 1000)/1000;
    team2[team2.length-1].offRebPer = Math.round(team2[team2.length-1].offRebPer * 1000)/1000;
}

// Run a game simulation (team1, team2, team shots/iteration, minutes/iteration, reshots allowed / iteration)
function runGame(homeTeam, visitorTeam, itShots, itMin, reshots){
    let numbIterations = 48/itMin;

    let homeTeamScore;
    let visitorTeamScore;

    // Get team percentages based on their opponent... chance to get rebounds
    playerGamePercentage(homeTeam, visitorTeam)

    for(let i=0; i<numbIterations; i++){
        // Each team shoots once
    }
};

teamShoots(clevelandCaveliers);

// Figure out which player is shooting on the team
function teamShoots(currentTeam){
    // Pick a random number 0 and 1000. Each players will cover a range of numbers between 1 and 1000 proportional to there chance to shoot
    let randNumb = Math.floor(Math.random() * 1000);
    let deciderArray = [];

    for(let i=0; i<(currentTeam.length -1 ); i++){
        if(i === 0){
            deciderArray[i] = currentTeam[i].shootChance * 1000;
        }
        else{
            deciderArray[i] = deciderArray[i-1] + currentTeam[i].shootChance * 1000;
        }
    }

    const shooter = () => {
        switch (true) {
            case (randNumb <= deciderArray[0]):
                curShoot = currentTeam[0].player;
                return curShoot;

            case (randNumb <= deciderArray[1]):
                curShoot = currentTeam[1].player;
                return curShoot;

            case (randNumb <= deciderArray[2]):
                curShoot = currentTeam[2].player;
                return curShoot;

            case (randNumb <= deciderArray[3]):
                curShoot = currentTeam[3].player;
                return curShoot;

            case (randNumb <= deciderArray[4]):
                curShoot = currentTeam[4].player;
                return curShoot;
            }

        return curShoot;
    }
    console.log(shooter() + " is shooting!");
}