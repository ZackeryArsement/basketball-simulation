import classes from './statTable.module.css'

import PlayerRow from './playerRow/PlayerRow'
import HeaderRow from './headerRow/HeaderRow'

import { useState, useEffect } from 'react';

const StatTable = ({ teamStats, team, teamData, winner }) => {
    const [statToggle, setStatToggle] = useState(false)

    const displayStats = () => {
        setStatToggle(!statToggle)
    }
    return (
        <div>
            <button className={classes.banner} onClick={displayStats} style={winner===team ? {backgroundImage:'linear-gradient(to right, var(--lightBlue), 60% , green)'} : {backgroundImage:'linear-gradient(to right, var(--deepOrange), 60% , red)'}}>
                {teamData.user} - {teamData.score}
            </button>
            <div className={classes.table} style={statToggle ? {display: 'block'} : {display: 'none'}}>
                <HeaderRow/>

                {teamStats.map((player)=> (
                    <div key={player.name}>
                        <PlayerRow playerStat={player}/>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default StatTable