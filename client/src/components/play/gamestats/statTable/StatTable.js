import classes from './statTable.module.css'

import PlayerRow from './playerRow/PlayerRow'
import HeaderRow from './headerRow/HeaderRow'

const StatTable = ({ teamStats, team }) => {

    return (
        <div>
            <HeaderRow/>
            {teamStats.map((player)=> (
                <div key={player.name}>
                    <PlayerRow playerStat={player}/>
                </div>
            ))}
        </div>
    )
}

export default StatTable