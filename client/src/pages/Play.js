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
                tempPlayer.chanceSteal = null;
                tempPlayer.chanceTurnOver = null;
                tempPlayer.chanceTwoBlock = null;
                tempPlayer.chanceThreeBlock = null;

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
                defRebPer: null,
                steals: null,
                stealPer: null,
                turnOvers: null,
                turnOverPer: null,
                twoBlocks: null,
                threeBlocks: null,
                twoBlockPer: null,
                threeBlockPer: null,
                possessions: null,
            }

            await setTeam(team => [...team, teamStats])
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
            currentTeam[currentTeam.length-1].steals = currentTeam[currentTeam.length-1].steals + currentPlayer.steals;
            currentTeam[currentTeam.length-1].turnOvers = currentTeam[currentTeam.length-1].turnOvers + currentPlayer.turnOvers;
            currentTeam[currentTeam.length-1].twoBlocks = currentTeam[currentTeam.length-1].twoBlocks + currentPlayer.twoBlocks;
            currentTeam[currentTeam.length-1].threeBlocks = currentTeam[currentTeam.length-1].threeBlocks + currentPlayer.threeBlocks;

            // 0.96 is when defensive player tips ball out of bounds during rebound. Therefore offense does not get rebound but possession continues
            currentTeam[currentTeam.length-1].possessions = 0.96*(currentTeam[currentTeam.length-1].totShots + currentTeam[currentTeam.length-1].turnOvers - currentTeam[currentTeam.length-1].offensiveRebounds);
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

            // Chance that this player steals the ball
            currentPlayer.chanceSteal = currentPlayer.steals / currentTeam[currentTeam.length-1].steals;

            // Chance that this player steals the ball
            currentPlayer.chanceTurnOver = currentPlayer.turnOvers / currentTeam[currentTeam.length-1].turnOvers;

            // Chance that this player blocks a two
            currentPlayer.chanceTwoBlock = currentPlayer.twoBlocks / currentTeam[currentTeam.length-1].twoBlocks;

            // Chance that this player blocks a three
            currentPlayer.chanceThreeBlock = currentPlayer.threeBlocks / currentTeam[currentTeam.length-1].threeBlocks;


            // Round every percent to the nearest 1000th places
            currentPlayer.shootChance = Math.round(currentPlayer.shootChance * 1000)/1000;
            currentPlayer.chanceOffReb = Math.round(currentPlayer.chanceOffReb * 1000)/1000;
            currentPlayer.chanceDefReb = Math.round(currentPlayer.chanceDefReb * 1000)/1000;
            currentPlayer.chanceSteal = Math.round(currentPlayer.chanceSteal * 1000)/1000;
            currentPlayer.chanceTwoBlock = Math.round(currentPlayer.chanceTwoBlock * 1000)/1000;
            currentPlayer.chanceThreeBlock = Math.round(currentPlayer.chanceThreeBlock * 1000)/1000;
            currentPlayer.chanceTurnOver = Math.round(currentPlayer.chanceTurnOver * 1000)/1000;

        }
    }

    // Get stats related to specific team match up
    const playerGamePercentage = (team1, team2) => {
        // The chance that each team gets a rebound, depending on their possession
        team1[team1.length-1].defRebPer = team1[team1.length-1].defensiveRebounds / (team1[team1.length-1].defensiveRebounds  + team2[team2.length-1].offensiveRebounds);
        team2[team2.length-1].defRebPer = team2[team2.length-1].defensiveRebounds  / (team2[team2.length-1].defensiveRebounds + team1[team1.length-1].offensiveRebounds);
        team1[team1.length-1].offRebPer = team1[team1.length-1].offensiveRebounds / (team1[team1.length-1].offensiveRebounds + team2[team2.length-1].defensiveRebounds);
        team2[team2.length-1].offRebPer = team2[team2.length-1].offensiveRebounds / (team2[team2.length-1].offensiveRebounds + team1[team1.length-1].defensiveRebounds );

        // Chance that the defensive team blocks a shot being taken
        // Assume average of 54 2FGA shots per game
        team1[team1.length-1].twoBlockPer = (team1[team1.length-1].twoBlocks/54)
        team2[team2.length-1].twoBlockPer = (team2[team2.length-1].twoBlocks/54)

        // Assume average of 34 3FGA shots per game
        team1[team1.length-1].threeBlockPer = (team1[team1.length-1].threeBlocks/34)
        team2[team2.length-1].threeBlockPer = (team2[team2.length-1].threeBlocks/34)

        // Round each stat to nearest 1000th
        team1[team1.length-1].defRebPer  = Math.round(team1[team1.length-1].defRebPer * 1000)/1000;
        team2[team2.length-1].defRebPer  = Math.round(team2[team2.length-1].defRebPer * 1000)/1000;
        
        team1[team1.length-1].offRebPer = Math.round(team1[team1.length-1].offRebPer * 1000)/1000;
        team2[team2.length-1].offRebPer = Math.round(team2[team2.length-1].offRebPer * 1000)/1000;

        team1[team1.length-1].possessions  = Math.round(team1[team1.length-1].possessions * 1000)/1000;
        team2[team2.length-1].possessions  = Math.round(team2[team2.length-1].possessions * 1000)/1000;

        team1[team1.length-1].steals  = Math.round(team1[team1.length-1].steals * 1000)/1000;
        team2[team2.length-1].steals  = Math.round(team2[team2.length-1].steals * 1000)/1000;

        team1[team1.length-1].totShots  = Math.round(team1[team1.length-1].totShots * 1000)/1000;
        team2[team2.length-1].totShots  = Math.round(team2[team2.length-1].totShots * 1000)/1000;

        team1[team1.length-1].twoBlocks  = Math.round(team1[team1.length-1].twoBlocks * 1000)/1000;
        team2[team2.length-1].twoBlocks  = Math.round(team2[team2.length-1].twoBlocks * 1000)/1000;

        team1[team1.length-1].threeBlocks  = Math.round(team1[team1.length-1].threeBlocks * 1000)/1000;
        team2[team2.length-1].threeBlocks  = Math.round(team2[team2.length-1].threeBlocks * 1000)/1000;

        // Since the chance to block is typically less than 10% for each shot I add another digit to the end of the decimal ie a 3% chance is now represented by 0.300 instead of 0.030, in order to give a more accurate number
        team1[team1.length-1].twoBlockPer = Math.round(team1[team1.length-1].twoBlockPer * 10000)/1000;
        team2[team2.length-1].twoBlockPer = Math.round(team2[team2.length-1].twoBlockPer * 10000)/1000;

        team1[team1.length-1].threeBlockPer = Math.round(team1[team1.length-1].threeBlockPer * 10000)/1000;
        team2[team2.length-1].threeBlockPer = Math.round(team2[team2.length-1].threeBlockPer * 10000)/1000;
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

    // Figure out if the player shoots a 2pt or 3 pt... does he make it, miss it, or is it blocked
    const playerShoots = (currentPlayer, defTeam) => {
        let randNumb = Math.floor(Math.random() * 1000);
        let oddsTry2 = currentPlayer[0].attemptTwoPercentage*1000;

        let blockChance;
        let blockNumb;

        // Shoots a 2pt
        if(randNumb <= oddsTry2){
            // Check to see if shot is blocked before doing anything else
            blockNumb = Math.floor(Math.random() * 10000);
            blockChance = defTeam[5].twoBlockPer * 1000

            // console.log(blockNumb, blockChance)

            if(blockNumb <= blockChance){
                // Shot is blocked... it is a missed shot
                // Check which player blocked the shot and what team recovers the ball

                // twoBlockedShot returns the index of the player that blocked the ball on defense

                return [2, false, currentPlayer[1], twoBlockedShot(defTeam)];
            } else {
                // If shot isnt blocked then run as if a regular shot attempt happens

                // Get another random number to see if the player makes the shot
                randNumb = Math.floor(Math.random() * 1000);

                let oddMake2 = currentPlayer[0].twoPercentage*1000;

                // Player makes the shot
                if(randNumb <= oddMake2){
                    return [2, true, currentPlayer[1], null];
                }
                else{
                    return [2, false, currentPlayer[1], null];
                }
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

    const twoBlockedShot = (currentTeam) => {
        // Pick a random number 0 and 10000. Each players will cover a range of numbers between 1 and 1000 proportional to there chance to shoot
        let randNumb = Math.floor(Math.random() * 1000);
        let deciderArray = [];


        for(let i=0; i<(currentTeam.length -1 ); i++){
            if(i === 0){
                deciderArray[i] = currentTeam[i].chanceTwoBlock * 1000;
            }
            else{
                deciderArray[i] = deciderArray[i-1] + currentTeam[i].chanceTwoBlock * 1000;
            }
        }

        const blocker = () => {
            switch (true) {
                case (randNumb <= deciderArray[0]):
                    return 0;

                case (randNumb <= deciderArray[1]):
                    return 1;

                case (randNumb <= deciderArray[2]):
                    return 2;

                case (randNumb <= deciderArray[3]):
                    return 3;

                case (randNumb <= deciderArray[4]):
                    return 4;
                }
        }

        return blocker();
    }

    // Check which team gets the rebound
    const teamRebound = (offTeam, defTeam) => {
        let randNumb = Math.floor(Math.random() * 1000);

        // Odds that the offensive team gets the rebound
        let offChance = offTeam[offTeam.length -1 ].offRebPer * 1000;

        if(randNumb <= offChance){
            return [offTeam, 'Offensive', defTeam];
        }
        else{
            return [defTeam, 'Defensive', offTeam];
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
                defensiveRebounds: 0,
                twoBlocks: 0,
                threeBlocks: 0,
                steals: 0,
                turnOvers: 0
            };

            visitorStats[i] = {
                name: visitorTeam[i].name,
                points: 0,
                twosMade: 0,
                twoAttempts: 0,
                threesMade: 0,
                threeAttempts: 0,
                offensiveRebounds: 0,
                defensiveRebounds: 0,
                twoBlocks: 0,
                threeBlocks: 0,
                steals: 0,
                turnOvers: 0
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
            let homeShot = playerShoots(shooterHome, visitorTeam);
            let visitorShot = playerShoots(shooterVis, homeTeam);

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
                    // If the shot was blocked then add the stat to the 
                    else if (shotStatus[3] !== null && shotStatus[3] !== undefined){
                        addBlockStat('Home', shotStatus)

                        let reboundTeam = blockRecovery(homeTeam, visitorTeam, shotStatus[3]);

                        // Return index of player that rebounded and if Offensive or defensive
                        let reboundPlayer = playerRebound(reboundTeam);
                        addReboundStat('Home', reboundPlayer);
                        
                        // Whichever team gets the rebound gets to shoot the ball again
                        let teamShot = playerShoots(teamShooter(reboundTeam[0]), reboundTeam[2]);

                        // If the offensive team gets the rebound then home team can shoot
                        if(reboundTeam[1] === 'Offensive'){
                            checkShotRedo('Home', teamShot, reshots);
                        }
                        // Else then the defense can shoot
                        else{
                            checkShotRedo('Visitor', teamShot, reshots);
                        }
                    }
                    // If the team misses the shot then check to see what team gets the rebound
                    else{
                        let reboundTeam = teamRebound(homeTeam, visitorTeam);

                        // Return index of player that rebounded and if Offensive of defensive
                        let reboundPlayer = playerRebound(reboundTeam);
                        addReboundStat('Home', reboundPlayer);
                        
                        // Whichever team gets the rebound gets to shoot the ball again
                        let teamShot = playerShoots(teamShooter(reboundTeam[0]), reboundTeam[2]);

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
                    // If the shot was blocked then add the stat to the 
                    else if (shotStatus[3] !== null && shotStatus[3] !== undefined){
                        addBlockStat('Visitor', shotStatus)

                        let reboundTeam = blockRecovery(visitorTeam, homeTeam, shotStatus[3]);

                        // Return index of player that rebounded and if Offensive of defensive
                        let reboundPlayer = playerRebound(reboundTeam);
                        addReboundStat('Visitor', reboundPlayer);
                        
                        // Whichever team gets the rebound gets to shoot the ball again
                        let teamShot = playerShoots(teamShooter(reboundTeam[0]), reboundTeam[2]);

                        // If the offensive team gets the rebound then home team can shoot
                        if(reboundTeam[1] === 'Offensive'){
                            checkShotRedo('Visitor', teamShot, reshots);
                        }
                        // Else then the defense can shoot
                        else{
                            checkShotRedo('Home', teamShot, reshots);
                        }
                    }
                    // If the team misses the shot then check to see what team gets the rebound
                    else{
                        let reboundTeam = teamRebound(visitorTeam, homeTeam);

                        // Return index of player that rebounded and if Offensive of defensive
                        let reboundPlayer = playerRebound(reboundTeam);
                        addReboundStat('Visitor', reboundPlayer);
                        
                        // Whichever team gets the rebound gets to shoot the ball again
                        let teamShot = playerShoots(teamShooter(reboundTeam[0]), reboundTeam[2]);

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
                // shotStatus => [point, boolean, playerIndex, blockPlayerIndex]

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

            function addBlockStat(team, shotStatus){
                let currentTeam;

                // Get the home team object out of the gameStats object
                if(team === 'Home'){
                    currentTeam = gameStats[0];
                }
                else{
                    currentTeam = gameStats[1];
                }

                // Grab the current player that is shooting
                let currentPlayer = currentTeam[shotStatus[3]];

                // Add a block to that players stat; check if they blocked a 2 or 3 pointer
                if(shotStatus[0] === 2){
                    currentPlayer.twoBlocks = currentPlayer.twoBlocks + 1;
                } else {
                    currentPlayer.threeBlocks = currentPlayer.threeBlocks + 1;
                }
            }

            function blockRecovery(offTeam, defTeam, playerIndex){
                // Get the player that is blocking
                let blockingPlayer = defTeam[playerIndex];
                
                // Find the percent chance for the defense to recover a ball for this player's blocks
                let defRecoveryPer = blockingPlayer.blockRecoveryPer*1000;

                let randNumb = Math.floor(Math.random() * 1000);

                // Defense recovers the ball after the block and they gain a rebound
                if(randNumb <= defRecoveryPer){
                    return [defTeam, 'Defensive', offTeam];
                } else {
                    return [offTeam, 'Offensive', defTeam];
                }
            }
        }

        gameStats[2] = [{
            user: homeTeam[homeTeam.length-1].teamName,
            score: homeTeamScore
        }, 
        {
            user: visitorTeam[visitorTeam.length-1].teamName,
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
                        assists: 5,
                        twoBlocks: player.twoBlocks,
                        threeBlocks: player.threeBlocks,
                        steals: player.steals,
                        turnOvers: player.turnOvers
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
                        assists: 5,
                        twoBlocks: player.twoBlocks,
                        threeBlocks: player.threeBlocks,
                        steals: player.steals,
                        turnOvers: player.turnOvers
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
        if(team.length > 2){
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
                tempPlayer.chanceSteal = null;
                tempPlayer.chanceTurnOver = null;
                tempPlayer.chanceTwoBlock = null;
                tempPlayer.chanceThreeBlock = null;
    
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
                defRebPer: null,
                steals: null,
                stealPer: null,
                turnOvers: null,
                turnOverPer: null,
                twoBlocks: null,
                threeBlocks: null,
                twoBlockPer: null,
                threeBlockPer: null,
                possessions: null,
            }
    
            await AITeam.push(teamStats);
    
            await teamSeasonPercentage(AITeam)
            await runGame(team, AITeam, 1, 1, 3, true)
        } else {
            console.log("You need a team in order to play!")
        }

    }

    const runMultiplayer = async () => {
        console.log('nothing')
    }

    return (
        <div className={classes.main}>
            <div className={classes.buttons}>
                <button className={classes.playBtn} onClick={runAI}>Play AI</button>
                <button className={classes.playBtn} onClick={runMultiplayer}>Play User</button>
            </div>

            <GameStat gameStatistics={gameStatistics}/>
        </div>
    )
}

export default Play