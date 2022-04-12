import { useEffect, useState } from "react";

import classes from './Play.module.css'

import GameStat from "../components/play/gamestats/GameStats";

import { useQuery, useMutation } from '@apollo/client'
import { ADD_GAME } from '../components/utils/mutations';
import { ADD_STATS } from "../components/utils/mutations";
import { QUERY_PLAYERS } from '../components/utils/queries';
import { QUERY_USER_TEAM } from "../components/utils/queries";

import Auth from '../components/utils/auth'

const Play = () => {
    const { loading: loadingT, data: dataT, refetch } = useQuery(QUERY_USER_TEAM);
    const { loading: loadingR, data: dataR } = useQuery(QUERY_PLAYERS);
    const [addGame] = useMutation(ADD_GAME);
    const [addStats] = useMutation(ADD_STATS);

    const [team, setTeam] = useState([]);
    const [players, setPlayers] = useState([]);
    const [gameStatistics, setGameStatistics] = useState([]);

    useEffect(async ()=>{
        if(!loadingT && team.length === 0){
            await refetch();
            let playerStats = [];

            await dataT.userTeam.team.map((player, index) => {
                let tempPlayer = JSON.parse(JSON.stringify(player.playerStat))

                tempPlayer.shootChance = null;
                tempPlayer.chanceOffReb = null;
                tempPlayer.chanceDefReb = null;

                Object.preventExtensions(tempPlayer)

                playerStats[index] = tempPlayer;
            })

            await setTeam(playerStats)
            
            let teamStats = {
                teamName: Auth.getProfile().data.username,
                imgURL: "./assets/images/GSW.jpg",
                totShots: null,
                offensiveRebounds: null,
                defensiveRebounds: null,
                offRebPer: null,
                defRebPer: null
            }

            setTeam(team => [...team, teamStats])
        }
    }, [loadingT])

    useEffect(()=>{
        if(!loadingR){
            setPlayers(dataR.players)
        }
    }, [loadingR])

    useEffect(()=>{
        if(team.length === 6){
            // console.log(team)
            teamSeasonPercentage(team);
        }
    }, [team])

    // Establish each players 2pt% and 3pt% 
    const teamSeasonPercentage = (currentTeam) => {
        // Go through each player on the team
        for(let playerIndex=0; playerIndex<(currentTeam.length-1); playerIndex++){
            let currentPlayer = currentTeam[playerIndex];
            let playerTotShots = currentPlayer.twoAttempts + currentPlayer.threeAttempts;

            // Add player stats to team total stats
            currentTeam[currentTeam.length-1].totShots = currentTeam[currentTeam.length-1].totShots + playerTotShots;
            currentTeam[currentTeam.length-1].offensiveRebounds = currentTeam[currentTeam.length-1].offensiveRebounds + currentPlayer.offensiveRebounds;
            currentTeam[currentTeam.length-1].defensiveRebounds = currentTeam[currentTeam.length-1].defensiveRebounds + currentPlayer.defensiveRebounds;
        }

        // Sum up each teams total shot, check each players chance to shoot
        for(let playerIndex=0; playerIndex<(currentTeam.length-1); playerIndex++){
            let currentPlayer = currentTeam[playerIndex];
            let playerTotShots = currentPlayer.twoAttempts + currentPlayer.threeAttempts;

            // Chance that this player shoots a shot
            currentPlayer.shootChance = playerTotShots / currentTeam[currentTeam.length-1].totShots;

            // Chance a player gets offensive rebound
            currentPlayer.chanceOffReb = currentPlayer.offensiveRebounds / currentTeam[currentTeam.length-1].offensiveRebounds;

            // Chance a player gets defensive roubound
            currentPlayer.chanceDefReb = currentPlayer.defensiveRebounds / currentTeam[currentTeam.length-1].defensiveRebounds;

            // Round every percent to the nearest 1000th places
            currentPlayer.shootChance = Math.round(currentPlayer.shootChance * 1000)/1000;
            currentPlayer.chanceOffReb = Math.round(currentPlayer.chanceOffReb * 1000)/1000;
            currentPlayer.chanceDefReb = Math.round(currentPlayer.chanceDefReb * 1000)/1000;
        }
    }

    // Get stats related to specific team match up
    const playerGamePercentage = (team1, team2) => {
        // The chance that each team gets a rebound, depending on their possession
        // console.log(team1, team2)
        team1[team1.length-1].defRebPer = team1[team1.length-1].defensiveRebounds / (team1[team1.length-1].defensiveRebounds  + team2[team2.length-1].offensiveRebounds);
        team2[team2.length-1].defRebPer = team2[team2.length-1].defensiveRebounds  / (team2[team2.length-1].defensiveRebounds + team1[team1.length-1].offensiveRebounds);
        team1[team1.length-1].offRebPer = team1[team1.length-1].offensiveRebounds / (team1[team1.length-1].offensiveRebounds + team2[team2.length-1].defensiveRebounds);
        team2[team2.length-1].offRebPer = team2[team2.length-1].offensiveRebounds / (team2[team2.length-1].offensiveRebounds + team1[team1.length-1].defensiveRebounds );

        // Round each stat to nearest 1000th
        team1[team1.length-1].defRebPer  = Math.round(team1[team1.length-1].defRebPer * 1000)/1000;
        team2[team2.length-1].defRebPer  = Math.round(team2[team2.length-1].defRebPer * 1000)/1000;
        team1[team1.length-1].offRebPer = Math.round(team1[team1.length-1].offRebPer * 1000)/1000;
        team2[team2.length-1].offRebPer = Math.round(team2[team2.length-1].offRebPer * 1000)/1000;
    }

    // Figure out which player is shooting on the team
    const teamShooter = (currentTeam) => {
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
            let curShoot;

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
    const playerShoots = (currentPlayer) => {
        let randNumb = Math.floor(Math.random() * 1000);
        let oddsTry2 = currentPlayer[0].attemptTwoPercentage*1000;

        // Shoots a 2pt
        if(randNumb <= oddsTry2){
            // Get another random number to see if the player makes the shot
            randNumb = Math.floor(Math.random() * 1000);

            let oddMake2 = currentPlayer[0].twoPercentage*1000;

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

            let oddMake3 = currentPlayer[0].threePercentage*1000;

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
    const teamRebound = (offTeam, defTeam) => {
        let randNumb = Math.floor(Math.random() * 1000);

        // Odds that the offensive team gets the rebound
        let offChance = offTeam[offTeam.length -1 ].offRebPer * 1000;

        if(randNumb <= offChance){
            return [offTeam, 'Offensive'];
        }
        else{
            return [defTeam, 'Defensive'];
        }
    }

    // Run a game simulation (team1, team2, team shots/iteration, minutes/iteration, reshots allowed / iteration)
    const runGame = async (homeTeam, visitorTeam, itShots, itMin, allowedReshots, aiGame ) => {
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
                twosMade: 0,
                twoAttempts: 0,
                threesMade: 0,
                threeAttempts: 0,
                offensiveRebounds: 0,
                defensiveRebounds: 0
            };

            visitorStats[i] = {
                name: visitorTeam[i].name,
                points: 0,
                twosMade: 0,
                twoAttempts: 0,
                threesMade: 0,
                threeAttempts: 0,
                offensiveRebounds: 0,
                defensiveRebounds: 0
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
                    currentPlayer.twoAttempts = currentPlayer.twoAttempts + 1;

                    // If the player made the shot then add 2 points to stats
                    if(shotStatus[1]){
                        currentPlayer.twosMade = currentPlayer.twosMade + 1;
                        currentPlayer.points = currentPlayer.points + 2;
                        return;
                    }
                }
                // Shoots a 3
                else{
                    currentPlayer.threeAttempts = currentPlayer.threeAttempts + 1;

                    // If the player made the shot then add 2 points to stats
                    if(shotStatus[1]){
                        currentPlayer.threesMade = currentPlayer.threesMade + 1;
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
                    currentTeam[playerIndex].offensiveRebounds = currentTeam[playerIndex].offensiveRebounds + 1;
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

                    currentTeam[playerIndex].defensiveRebounds = currentTeam[playerIndex].defensiveRebounds + 1;
                }
            }
        }

        // console.log('The home team scored ' + homeTeamScore + ' points!');
        // console.log('The visitor team scored ' + visitorTeamScore + ' points!');
        // console.log('The home team shot ' + homeTeamShots + ' times.');
        // console.log('The home team shot ' + visitorTeamShots + ' times.');

        // createMainTable(gameStats[0], gameStats[1]);
        // displayScoreWinner(homeTeamScore, visitorTeamScore, homeTeam, visitorTeam);
        // console.log(homeTeam)
        gameStats[2] = [{
            user: team[team.length-1].teamName,
            score: homeTeamScore
        }, 
        {
            user: team[team.length-1].teamName,
            score: visitorTeamScore
        }];

        await setGameStatistics(gameStats);

        if(aiGame){
            const newGame = await addGame({
                variables: {
                    user1: Auth.getProfile().data.username,
                    ai: aiGame,
                    score1: homeTeamScore,
                    score2: visitorTeamScore,
                }
            })

            let team1 = gameStats[0];
            let team2 = gameStats[1];


            await team1.map(async (player) => {
                await addStats({
                    variables: {
                        gameId: newGame.data.addGame._id, 
                        team: 1, 
                        name: player.name, 
                        twoAttempts: player.twoAttempts, 
                        threeAttempts: player.threeAttempts, 
                        twosMade: player.twosMade, 
                        threesMade: player.threesMade, 
                        offensiveRebounds: player.offensiveRebounds, 
                        defensiveRebounds: player.defensiveRebounds, 
                        assists: 5
                    }
                })
            })

            await team2.map(async (player) => {
                await addStats({
                    variables: {
                        gameId: newGame.data.addGame._id, 
                        team: 2, 
                        name: player.name, 
                        twoAttempts: player.twoAttempts, 
                        threeAttempts: player.threeAttempts, 
                        twosMade: player.twosMade, 
                        threesMade: player.threesMade, 
                        offensiveRebounds: player.offensiveRebounds, 
                        defensiveRebounds: player.defensiveRebounds, 
                        assists: 5
                    }
                })
            })
        }

        
    };

    const playerRebound = (reboundTeam) => {
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

    const runAI = async () => {
        const newTeam = () => {
            let CreatedTeam = []

            for(let i=0; i<5;){
                const rand = Math.floor(Math.random()*players.length);
                if(CreatedTeam.indexOf(players[rand]) !== -1){
                    continue;
                };
                CreatedTeam.push(players[rand]);
                i++
            }

            return CreatedTeam
        }

        let AITeam = [];

        await newTeam().map((player, index) => {
            let tempPlayer = JSON.parse(JSON.stringify(player))

            tempPlayer.shootChance = null;
            tempPlayer.chanceOffReb = null;
            tempPlayer.chanceDefReb = null;

            Object.preventExtensions(tempPlayer)

            AITeam[index] = tempPlayer;
        })
        
        let teamStats = {
            teamName: 'AI TEAM',
            imgURL: "./assets/images/GSW.jpg",
            totShots: null,
            offensiveRebounds: null,
            defensiveRebounds: null,
            offRebPer: null,
            defRebPer: null
        }

        await AITeam.push(teamStats);

        await teamSeasonPercentage(AITeam)
        // console.log(AITeam)
        // console.log(team)
        runGame(team, AITeam, 1, 1, 3, true)
    }

    const runMultiplayer = async () => {
        console.log('nothing')
    }

    return (
        <div className={classes.main}>
            <button className={classes.playBtn} onClick={runAI}>Play AI</button>
            <button className={classes.playBtn} onClick={runMultiplayer}>Play User</button>

            <GameStat gameStatistics={gameStatistics}/>
        </div>
    )
}

export default Play