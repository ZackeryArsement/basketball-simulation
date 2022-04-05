import classes from './Team.module.css'

import { useQuery } from "@apollo/client";
import { QUERY_USER_TEAM } from "../../../components/utils/queries";
import { useState, useEffect } from 'react';

import PlayerRow from './playerRow/PlayerRow'
import HeaderRow from './headerRow/HeaderRow';

const Team = () => {
    const { loading: loadingT, data: dataT, refetch } = useQuery(QUERY_USER_TEAM);

    const [team, setTeam] = useState([]);


    useEffect(async () => {
        if(!loadingT){
            await refetch();
            let tempTeam = [...dataT.userTeam.team];

            setTeam(tempTeam.sort((a, b) => {
                return b.playerStat.pointsPerGame - a.playerStat.pointsPerGame
            }))
        }
    }, [loadingT])

    return (
        <div className={classes.teamTable}>
            <HeaderRow />
            {team.length === 5 ? 
                team.map((player) => (
                    <PlayerRow playerStat={player.playerStat} key={player.name} />
                )) : null}
        </div>
    )
}

export default Team