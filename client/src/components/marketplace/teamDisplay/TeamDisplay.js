import classes from './TeamDisplay.module.css'

const TeamDisplay = ({ team, releasePlayer, finalizeTeam }) => {
    return(
        <div className={classes.teamDisplay}>
            <button className={classes.finalizeBtn} onClick={finalizeTeam}>Sign Players</button>
            {team && team.map((player) => (
                <div key={player.name}>
                    {player.playerStat ? (
                        <div className={classes.playerDisplay}>
                            <div className={classes.name}>
                                {player.name}
                            </div>
                            <div className={classes.stat}>
                                PPG: {player.playerStat.pointsPerGame}
                            </div>
                            <div className={classes.stat}>
                                RPG: {player.playerStat.totalRebounds}
                            </div>
                            <div className={classes.stat}>
                                APG: {player.playerStat.assists}
                            </div>
                            <button className={classes.releaseBtn} value={player._id} onClick={releasePlayer}>Release</button>
                        </div>
                    ) : (
                        <div className={classes.playerDisplay}>
                            <div className={classes.name}>
                                {player.name}
                            </div>
                            <div className={classes.stat}>
                                PPG: {player.pointsPerGame}
                            </div>
                            <div className={classes.stat}>
                                RPG: {player.totalRebounds}
                            </div>
                            <div className={classes.stat}>
                                APG: {player.assists}
                            </div>

                            <button className={classes.releaseBtn} value={player._id} onClick={releasePlayer}>Release</button>
                        </div>
                    )}

                </div>
            ))}
        </div>
    )
}

export default TeamDisplay;