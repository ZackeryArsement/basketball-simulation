// Golden State Warriors 2015-2016
let goldenState = [
    {
        name: "Steph Curry",
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
        name: "Draymond Green",
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
        name: "Klay Thompson",
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
        name: "Andre Iguodala",
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
        name: "Harrison Barnes",
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
        imgURL: "./assets/images/GSW.jpg",
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
        name: "Lebron James",
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
        name: "Kyrie Irving",
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
        name: "Kevin Love",
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
        name: "J.R. Smith",
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
        name: "Tristan Thompson",
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
        imgURL: "./assets/images/CLE-banner.png",
        totShots: null,
        offReb: null,
        defReb: null,
        offRebPer: null,
        defRebPer: null
    }
];

let GSWwins = 0;
let CLCwins = 0;

teamSeasonPercentage(goldenState);
teamSeasonPercentage(clevelandCaveliers);

for(let i=0; i<1; i++){
    // Run a game where each team shoots at minimum 1 shot per 1 minute... 3 chances to put up missed shots
    runGame(goldenState, clevelandCaveliers, 1, 1, 3);
}


console.log('Golden State Wins: ' + GSWwins);
console.log('Cleveland Cavelier Wins: ' + CLCwins);

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

// Figure out which player is shooting on the team
function teamShooter(currentTeam){
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
                curShoot = currentTeam[0];
                return [curShoot, 0];

            case (randNumb <= deciderArray[1]):
                curShoot = currentTeam[1];
                return [curShoot, 1];

            case (randNumb <= deciderArray[2]):
                curShoot = currentTeam[2];
                return [curShoot, 2];

            case (randNumb <= deciderArray[3]):
                curShoot = currentTeam[3];
                return [curShoot, 3];

            case (randNumb <= deciderArray[4]):
                curShoot = currentTeam[4];
                return [curShoot, 4];
            }
    }

    return shooter();
}

// Figure out if the player shoots a 2pt or 3 pt... does he make it or miss
function playerShoots(currentPlayer){
    let randNumb = Math.floor(Math.random() * 1000);
    let oddsTry2 = currentPlayer[0].chance2*1000;

    // Shoots a 2pt
    if(randNumb <= oddsTry2){
        // Get another random number to see if the player makes the shot
        randNumb = Math.floor(Math.random() * 1000);

        let oddMake2 = currentPlayer[0].per2*1000;

        // Player makes the shot
        if(randNumb <= oddMake2){
            return [2, true, currentPlayer[1]];
        }
        else{
            return [2, false, currentPlayer[1]];
        }
    }
    // Shoots a 3pt
    else{
        // Get another random number to see if the player makes the shot
        randNumb = Math.floor(Math.random() * 1000);

        let oddMake3 = currentPlayer[0].per3*1000;

        // Player makes the shot
        if(randNumb <= oddMake3){
            return [3, true, currentPlayer[1]];
        }
        else{
            return [3, false, currentPlayer[1]];
        }
    }
}

// Check which team gets the rebound
function teamRebound(offTeam, defTeam){
    let randNumb = Math.floor(Math.random() * 1000);

    // Odds that the offensive team gets the rebound
    let offChance = offTeam.offRebPer * 1000;

    if(randNumb <= offChance){
        return [offTeam, 'Offensive'];
    }
    else{
        return [defTeam, 'Defensive'];
    }
}

// Fill in the table for the stats of the current game
function createMainTable(homeTeam, visitorTeam){
    let homeTable = document.getElementById('main-table-home');
    let visitorTable = document.getElementById('main-table-visitor');
    let currentTeam;
    let currentTable;

    // Fill in both tables
    for(let teamIndex=0; teamIndex<2; teamIndex++){
        if(teamIndex === 0){
            currentTeam = homeTeam;
            currentTable = homeTable;
        }else{
            currentTeam = visitorTeam;
            currentTable = visitorTable;
        }

        let tableBody = currentTable.querySelector('tbody');

        // Create a row for each player
        for(let playerIndex=0; playerIndex<(currentTeam.length); playerIndex++){
            let newRow = document.createElement('tr');

            // Create a player name column and append to the player's row
            let nameColumn = document.createElement('th');
            nameColumn.setAttribute('scope', 'row');
            nameColumn.textContent = currentTeam[playerIndex].name;
            newRow.append(nameColumn);

            // Create an array of the players stats
            let currentPlayer = currentTeam[playerIndex]
            let playerStats = [currentPlayer.points, (currentPlayer.made2 + currentPlayer.made3), (currentPlayer.att2 + currentPlayer.att3), currentPlayer.made3, currentPlayer.att3, (currentPlayer.offReb + currentPlayer.defReb)];
            
            // Create a column for each players stat
            for(let statIndex=0; statIndex<6; statIndex++){
                let statColumn = document.createElement('td');

                // Add the stat column to the row being created
                statColumn.textContent = playerStats[statIndex];
                newRow.append(statColumn);
            }

            // Add the newly created row with its stats to the table
            tableBody.append(newRow);
        }
    }
}

// Run a game simulation (team1, team2, team shots/iteration, minutes/iteration, reshots allowed / iteration)
function runGame(homeTeam, visitorTeam, itShots, itMin, allowedReshots){
    let numbIterations = 48/itMin;

    let homeTeamScore = 0;
    let visitorTeamScore = 0;

    let homeTeamShots = 0;
    let visitorTeamShots = 0;

    // Keep track of players stats for this specific game
    let homeStats = [];
    let visitorStats = [];

    // Create empty objects for each player to store their game stats
    for(let i=0; i<5; i++){
        homeStats[i] = {
            name: homeTeam[i].name,
            points: 0,
            made2: 0,
            att2: 0,
            made3: 0,
            att3: 0,
            offReb: 0,
            defReb: 0
        };

        visitorStats[i] = {
            name: visitorTeam[i].name,
            points: 0,
            made2: 0,
            att2: 0,
            made3: 0,
            att3: 0,
            offReb: 0,
            defReb: 0
        }
    }

    // Game stats stores each team player stats
    let gameStats = [homeStats, visitorStats];

    // Get team percentages based on their opponent... chance to get rebounds
    playerGamePercentage(homeTeam, visitorTeam)

    // Each team shoots a shot for every iteration in the game
    for(let i=0; i<numbIterations; i++){
        // Each team shoots at a base amount once... figure out which player shoots
        let shooterHome = teamShooter(homeTeam);
        let shooterVis = teamShooter(visitorTeam);

        // See if that shooter tries a 2pt or 3pt... do they make the shot?
        let homeShot = playerShoots(shooterHome);
        let visitorShot = playerShoots(shooterVis);

        // When a shot is missed teams can rebound and reshoot... limit is dependant on allowedReshots
        let reshots = 0;

        checkShotRedo('Home', homeShot, reshots);
        checkShotRedo('Visitor', visitorShot, reshots);
    }
    
    // Add to score if the shot it made, if it's missed then rebound and shoot again (Keep inside game function so scores can remain local variables)
    function checkShotRedo(team, shotStatus, reshots){
        // This function can only be ran dependant on the allowed reshots
        if(reshots < allowedReshots){
            // Count how many rebounded shots the team makes
            reshots = reshots + 1;

            // Home team shot
            if(team === 'Home'){
                addShotStat('Home', shotStatus);

                if(shotStatus[1]){
                    // homeTeamShots = homeTeamShots + 1;
                    homeTeamScore = homeTeamScore + shotStatus[0];
                } 
                // If the team misses the shot then check to see what team gets the rebound
                else{
                    let reboundTeam = teamRebound(homeTeam, visitorTeam);

                    // Return index of player that rebounded and if Offensive of defensive
                    let reboundPlayer = playerRebound(reboundTeam);
                    addReboundStat('Home', reboundPlayer);
                    
                    // Whichever team gets the rebound gets to shoot the ball again
                    let teamShot = playerShoots(teamShooter(reboundTeam[0]));

                    // If the offensive team gets the rebound then home team can shoot
                    if(reboundTeam[1] === 'Offensive'){
                        checkShotRedo('Home', teamShot, reshots);
                    }
                    // Else then the defense can shoot
                    else{
                        checkShotRedo('Visitor', teamShot, reshots);
                    }
                }
            } 
            // Visitor team shot
            else {
                addShotStat('Visitor', shotStatus);

                if(shotStatus[1]){
                    // visitorTeamShots = visitorTeamShots + 1;
                    visitorTeamScore = visitorTeamScore + shotStatus[0];
                } 
                // If the team misses the shot then check to see what team gets the rebound
                else{
                    let reboundTeam = teamRebound(visitorTeam, homeTeam);

                    // Return index of player that rebounded and if Offensive of defensive
                    let reboundPlayer = playerRebound(reboundTeam);
                    addReboundStat('Visitor', reboundPlayer);
                    
                    // Whichever team gets the rebound gets to shoot the ball again
                    let teamShot = playerShoots(teamShooter(reboundTeam[0]));

                    // If the offensive team gets the rebound then home team can shoot
                    if(reboundTeam[1] === 'Offensive'){
                        checkShotRedo('Visitor', teamShot, reshots);
                    }
                    // Else then the defense can shoot
                    else{
                        checkShotRedo('Home', teamShot, reshots);
                    }
                }

            }
        }

        // Add the shooting stats to the player that just shot
        function addShotStat(team, shotStatus){
            // shotStatus => [point, boolean, playerIndex]

            let currentTeam;

            // Get the home team object out of the gameStats object
            if(team === 'Home'){
                currentTeam = gameStats[0];
                homeTeamShots = homeTeamShots + 1;
            }
            else{
                currentTeam = gameStats[1];
                visitorTeamShots = visitorTeamShots + 1;
            }

            // Grab the current player that is shooting
            let currentPlayer = currentTeam[shotStatus[2]];

            // Check if the player shot a 2 or a 3 and add it to attempted shots
            // Shoots a 2
            if(shotStatus[0] === 2){
                currentPlayer.att2 = currentPlayer.att2 + 1;

                // If the player made the shot then add 2 points to stats
                if(shotStatus[1]){
                    currentPlayer.made2 = currentPlayer.made2 + 1;
                    currentPlayer.points = currentPlayer.points + 2;
                    return;
                }
            }
            // Shoots a 3
            else{
                currentPlayer.att3 = currentPlayer.att3 + 1;

                // If the player made the shot then add 2 points to stats
                if(shotStatus[1]){
                    currentPlayer.made3 = currentPlayer.made3 + 1;
                    currentPlayer.points = currentPlayer.points + 3;
                    return;
                }
            }
        }

        // Add the rebound stats to the player
        function addReboundStat(team, player){
            let currentTeam;

            // player => [player index, off/def]
            let playerIndex = player[0];
            let possession = player[1];

            // The team that got the rebound is on offense
            if(possession === 'Offensive'){
                // Change the current team getting the rebound depending on what side of the court the shot was on
                if(team === 'Home'){
                    currentTeam = gameStats[0];
                }
                else{
                    currentTeam = gameStats[1];
                }

                currentTeam[playerIndex].offReb = currentTeam[playerIndex].offReb + 1;
            }
            // The team that got the rebound is on defense
            else{
                // Change the current team getting the rebound depending on what side of the court the shot was on
                if(team === 'Visitor'){
                    currentTeam = gameStats[0];
                }
                else{
                    currentTeam = gameStats[1];
                }

                currentTeam[playerIndex].defReb = currentTeam[playerIndex].defReb + 1;
            }
        }
    }

    console.log('The home team scored ' + homeTeamScore + ' points!');
    console.log('The visitor team scored ' + visitorTeamScore + ' points!');
    // console.log('The home team shot ' + homeTeamShots + ' times.');
    // console.log('The home team shot ' + visitorTeamShots + ' times.');

    // createMainTable(gameStats[0], gameStats[1]);
    // displayScoreWinner(homeTeamScore, visitorTeamScore, homeTeam, visitorTeam);
    // console.log(homeTeam)
    console.log(gameStats)
};

function playerRebound(reboundTeam){
    let currentTeam = reboundTeam[0];
    let side = reboundTeam[1];

    // Pick a random number 0 and 1000. Each players will cover a range of numbers between 1 and 1000 proportional to there chance to shoot
    let randNumb = Math.floor(Math.random() * 1000);
    let deciderArray = [];

    if(side === 'Offensive'){
        for(let i=0; i<(currentTeam.length -1 ); i++){
            if(i === 0){
                deciderArray[i] = currentTeam[i].chanceOffReb * 1000;
            }
            else{
                deciderArray[i] = deciderArray[i-1] + currentTeam[i].chanceOffReb * 1000;
            }
        }
    }
    else{
        for(let i=0; i<(currentTeam.length -1 ); i++){
            if(i === 0){
                deciderArray[i] = currentTeam[i].chanceDefReb * 1000;
            }
            else{
                deciderArray[i] = deciderArray[i-1] + currentTeam[i].chanceDefReb * 1000;
            }
        }
    };

    // Determine which player rebounded the ball and return their index and if off/def
    const rebounder = () => {
        switch (true) {
            case (randNumb <= deciderArray[0]):
                return [0, side];

            case (randNumb <= deciderArray[1]):
                return [1, side];

            case (randNumb <= deciderArray[2]):
                return [2, side];

            case (randNumb <= deciderArray[3]):
                return [3, side];

            case (randNumb <= deciderArray[4]):
                return [4, side];
            }
    }

    return rebounder();
}

function displayScoreWinner(homeScore, visitorScore, homeTeam, visitorTeam){
    // Change the team names displayed
    let homeTeamDisplay = document.getElementsByClassName('home-team-name');
    let visitorTeamDisplay = document.getElementsByClassName('visitor-team-name');
    
    homeTeamDisplay[0].textContent = homeTeam[(homeTeam.length - 1)].teamName;
    visitorTeamDisplay[0].textContent = visitorTeam[(visitorTeam.length - 1)].teamName;

    // Change the display score
    let homeScoreDisplay = document.getElementsByClassName('home-team-score');
    let visitorScoreDisplay = document.getElementsByClassName('visitor-team-score');

    homeScoreDisplay[0].textContent = homeScore;
    visitorScoreDisplay[0].textContent = visitorScore;

    // Display the winner name and banner
    let winningTeamDisplay = document.getElementsByClassName('winning-team-name');
    let winnerBanner = document.getElementsByClassName('winning-banner');

    if(homeScore > visitorScore){
        GSWwins = GSWwins + 1;
        winningTeamDisplay[0].textContent = homeTeam[(homeTeam.length - 1)].teamName;
        winnerBanner[0].setAttribute('src', homeTeam[(homeTeam.length - 1)].imgURL);
    }
    else{
        CLCwins = CLCwins + 1;
        winningTeamDisplay[0].textContent = visitorTeam[(visitorTeam.length - 1)].teamName;
        winnerBanner[0].setAttribute('src', visitorTeam[(visitorTeam.length - 1)].imgURL);
    }
}
