import classes from './PlayerRow.module.css'

const PlayerRow = ({ playerStat }) => {
    return(
        <div className={classes.row}>
            <div className={classes.name}>
                {playerStat.name}
            </div>

            <div className={classes.statSection}>
                <div className={classes.stat}>
                    {playerStat.points}
                </div>
                <div className={classes.stat}>
                    {playerStat.offensiveRebounds + playerStat.defensiveRebounds}
                </div>
                <div className={classes.stat}>
                    {playerStat.twosMade}
                </div>
                <div className={classes.stat}>
                    {playerStat.twoAttempts}
                </div>
                <div className={classes.stat}>
                    {playerStat.threesMade}
                </div>
                <div className={classes.stat}>
                    {playerStat.threeAttempts}
                </div>
                <div className={classes.stat}>
                    {playerStat.offensiveRebounds}
                </div>
                <div className={classes.stat}>
                    {playerStat.defensiveRebounds}
                </div>
                <div className={classes.stat}>
                    {playerStat.twoBlocks + playerStat.threeBlocks}
                </div>
            </div>
        </div>
    )
}

export default PlayerRow