import classes from './statTable.module.css'

import PlayerRow from './playerRow/PlayerRow'
import HeaderRow from './headerRow/HeaderRow'

import { useState, useEffect } from 'react';

const StatTable = ({ teamStats, team, teamData }) => {
    const [statToggle, setStatToggle] = useState(false)

    const displayStats = () => {
        setStatToggle(!statToggle)
    }
    return (
        <div>
            <button className={classes.banner} onClick={displayStats}>
                {teamData.user} - {teamData.score}
            </button>
            <div style={statToggle ? {display: 'block'} : {display: 'none'}}>
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