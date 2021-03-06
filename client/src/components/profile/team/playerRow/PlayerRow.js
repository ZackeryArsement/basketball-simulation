import classes from './PlayerRow.module.css'

const PlayerRow = ({ playerStat, selectPlayer }) => {
    return(
        <div className={classes.row}>
            <button className={classes.name} onClick={selectPlayer} value={playerStat.name}>
                {playerStat.name}
            </button>

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
                <div className={classes.percentage}>
                    {playerStat.twoPercentage}
                </div>
                <div className={classes.percentage}>
                    {playerStat.threePercentage}
                </div>
                <div className={classes.rebounds}>
                    {playerStat.offensiveRebounds}
                </div>
                <div className={classes.rebounds}>
                    {playerStat.defensiveRebounds}
                </div>
            </div>
        </div>
    )
}

export default PlayerRow