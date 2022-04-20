import classes from './Team.module.css'

import { useQuery } from "@apollo/client";
import { QUERY_USER_TEAM } from "../../../components/utils/queries";
import { useState, useEffect } from 'react';

import Auth from '../../utils/auth'

import PlayerRow from './playerRow/PlayerRow'
import HeaderRow from './headerRow/HeaderRow';

const Team = ({ selectPlayer }) => {
    const { loading: loadingT, data: dataT, refetch } = useQuery(QUERY_USER_TEAM);

    const [team, setTeam] = useState([]);
    const [wins, setWins] = useState('');
    const [losses, setLosses] = useState('');
    const [winPercentage, setWinPercentage] = useState('');


    useEffect(async () => {
        if(!loadingT){
            await refetch();
            let tempTeam = [...dataT.userTeam.team];

            await setTeam(tempTeam.sort((a, b) => {
                return b.playerStat.pointsPerGame - a.playerStat.pointsPerGame
            }))
            setWins(dataT.userTeam.wins)
            setLosses(dataT.userTeam.losses)
            setWinPercentage(String(dataT.userTeam.winPercentage*100).substring(0,5))
        }
    }, [loadingT])

    return (
        <div className={classes.teamTable}>
            <div className={classes.header}>
                <button onClick={() => Auth.logout()} className={classes.logout}>Logout</button>

                <div className={classes.record}>
                    Record
                </div>

                <div className={classes.userStats}>
                    <div className={classes.stat}>
                        Wins: {wins}
                    </div>

                    <div className={classes.stat}>
                        Losses: {losses}
                    </div>
                    
                    <div className={classes.stat}>
                        Win Percentage: {winPercentage}%
                    </div>
                </div>

                <div className={classes.currentTeam}>
                    Current Team
                </div>
            </div>

            <HeaderRow />
            {team.length === 5 ? 
                team.map((player) => (
                    <PlayerRow playerStat={player.playerStat} key={player.name} selectPlayer={selectPlayer}/>
                )) : null}



        </div>
    )
}

export default Team