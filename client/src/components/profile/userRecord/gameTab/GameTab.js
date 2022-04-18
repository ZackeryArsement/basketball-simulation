import classes from './GameTab.module.css'

import { useState } from "react";

import HeaderRow from "./headerRow/HeaderRow";
import PlayerRow from "./playerRow/PlayerRow";

const GameTab = ({ game, selectPlayer }) => {
    const [statToggle, setStatToggle] = useState(false)

    const displayStats = () => {
        setStatToggle(!statToggle)
    }

    return(
        <div>
            <button className={classes.gameTab} onClick={displayStats} style={game.score1 > game.score2 
                ? {
                    backgroundImage:'linear-gradient(to right, var(--lightBlue), 80% , green)'
                } : {
                    backgroundImage:'linear-gradient(to right, var(--deepOrange), 80% , red)'}}>
                <div className={classes.buttonDiv}>
                    <div className={classes.username}>
                        {game.user1.username}
                    </div>
                    
                    {game.user2 ? (
                        <div className={classes.username}>
                            {game.user2.username}
                        </div>
                    ) : (
                        <div className={classes.username}>
                            AI TEAM
                        </div>
                    )}
                    <div className={classes.scoreDiv}>
                        <div className={classes.score}>
                            {game.score1}
                        </div>

                        <div className={classes.dash}>
                            -
                        </div>

                        <div className={classes.score}>
                            {game.score2}
                        </div>
                    </div>
                </div>
                
            </button>

            <div style={statToggle ? {display: 'block'} : {display: 'none'}}>
                <HeaderRow />

                {game.team1.map((player) => (
                    <PlayerRow playerStat={player} key={player._id} selectPlayer={selectPlayer}/>
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