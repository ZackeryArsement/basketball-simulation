import classes from './GameTab.module.css'

import { useState } from "react";

import HeaderRow from "./headerRow/HeaderRow";
import PlayerRow from "./playerRow/PlayerRow";

const GameTab = ({ game }) => {
    const [statToggle, setStatToggle] = useState(false)

    const displayStats = () => {
        setStatToggle(!statToggle)
    }

    return(
        <div>
            <button className={classes.gameTab} onClick={displayStats}>
                <div>
                    {game.user1.username}---
                </div>
                {game.user2 ? (
                    <div>
                        {game.user2.username}---
                    </div>
                ) : (
                    <div>
                        AI TEAM---
                    </div>
                )}
                <div>
                    {game.score1}
                </div>
                <div>
                    -
                </div>
                <div>
                    {game.score2}
                </div>
            </button>

            <div style={statToggle ? {display: 'block'} : {display: 'none'}}>
                <HeaderRow />

                {game.team1.map((player) => (
                    <PlayerRow playerStat={player} key={player._id}/>
                ))}
                
                <HeaderRow />

                {game.team2.map((player) => (
                    <PlayerRow playerStat={player} key={player._id}/>
                ))}
            </div>
        </div>
    )
}

export default GameTab;