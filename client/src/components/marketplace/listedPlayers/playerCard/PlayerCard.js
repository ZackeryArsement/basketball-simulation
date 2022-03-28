import classes from './PlayerCard.module.css'

const PlayerCard = ( players ) => {

    return(
        <div className={classes.playerCards}>
            {players.players.map((player, index)=> (
                <div className={classes.card} key={index}>
                    
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

                            <button className={classes.draftBtn}>Draft</button>
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
                        <div className={classes.leftStats}>
                            <div className={classes.points}>
                                PPG: {player.pointsPerGame}
                            </div>

                            <div className={classes.rebounds}>
                                RPG: {player.totalRebounds}
                            </div>

                            <div className={classes.assists}>
                                APG: {player.assists}
                            </div>
                        </div>

                        {/* Left Stats column */}
                        <div className={classes.rightStats}>
                            <div className={classes.attempts}>
                                2FG: {player.twoPercentage}
                            </div>

                            <div className={classes.percentages}>
                                3FG: {player.threePercentage}
                            </div>

                            <div className={classes.freeThrows}>
                                FT%: {player.assists}
                            </div>
                        </div>
 
                    </div>  
                </div>
            ))}
        </div>
    )
}

export default PlayerCard;