import { useEffect, useState } from 'react';
import classes from './PlayerCard.module.css'

const PlayerCard = ( { player, index, team, signPlayer, releasePlayer } ) => {
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if(team.filter(currentPlayer => currentPlayer.name === player.name).length > 0){
            setSelected(true);
        } else {
            setSelected(false);
        }

    }, [team])

    return(
        <div className={classes.playerCards}>
                <div className={classes.card} style={selected ? {backgroundColor: 'var(--softBlue)', color: 'black', textShadow: '0.5px 0.5px 3px var(--deepBlue)'} : {backgroundColor: 'var(--deepOrange)', textShadow: '0.5px 0.5px 3px var(--lightBrown)'}}>
                    
                    {/* Top row of player card */}
                    <div className={classes.topRow}>

                        {/* Left column of top row */}
                        <div className={classes.topLeft}>
                            <div className={classes.title}>
                                {player.name}
                            </div>

                            <div className={classes.score}>
                                99.87
                            </div>

                            <div className={classes.description}>
                                Salary
                            </div>

                            <button className={classes.draftBtn} onClick={!selected ? signPlayer : releasePlayer} value={player._id}  style={selected ? 
                                {
                                    backgroundColor: 'var(--lightBlue)', 
                                    borderBottom: 'var(--softBlue) 2px solid', 
                                    borderRight: 'var(--softBlue) 2px solid'
                                } : {
                                     backgroundColor: 'var(--lightOrange)'}}>
                                         Draft</button>
                        </div>

                        {/* Right column of top row */}
                        <div className={classes.topRight}>
                            <div className={classes.image}>
                            </div>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className={classes.stats}>

                        {/* Left Stats column */}
                        <div className={classes.statContainer}>
                            <div className={classes.stat}>
                                PPG: {player.pointsPerGame}
                            </div>

                            <div className={classes.stat}>
                                RPG: {player.totalRebounds}
                            </div>

                            <div className={classes.stat}>
                                APG: {player.assists}
                            </div>
                        </div>

                        {/* Left Stats column */}
                        <div className={classes.statContainer}>
                            <div className={classes.stat}>
                                2FG: {player.twoPercentage}
                            </div>

                            <div className={classes.stat}>
                                3FG: {player.threePercentage}
                            </div>

                            <div className={classes.stat}>
                                FT%: {player.assists}
                            </div>
                        </div>
 
                    </div>  
                </div>
        </div>
    )
}

export default PlayerCard;