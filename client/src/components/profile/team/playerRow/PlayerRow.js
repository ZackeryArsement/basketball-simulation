import classes from './PlayerRow.module.css'

const PlayerRow = ({ playerStat }) => {
    return(
        <div className={classes.row}>
            <div className={classes.name}>
                {playerStat.name}
            </div>

            <div className={classes.statSection}>
                <div className={classes.stat}>
                    {playerStat.pointsPerGame}
                </div>
                <div className={classes.stat}>
                    {playerStat.totalRebounds}
                </div>
                <div className={classes.stat}>
                    {playerStat.assists}
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
                    {playerStat.twoPercentage}
                </div>
                <div className={classes.stat}>
                    {playerStat.threePercentage}
                </div>
                <div className={classes.stat}>
                    {playerStat.offensiveRebounds}
                </div>
                <div className={classes.stat}>
                    {playerStat.defensiveRebounds}
                </div>
            </div>
        </div>
    )
}

export default PlayerRow