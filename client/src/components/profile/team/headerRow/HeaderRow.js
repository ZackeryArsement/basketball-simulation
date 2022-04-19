import classes from './HeaderRow.module.css'

const HeaderRow = () => {
    return(
        <div className={classes.row}>
            <div className={classes.name}>
            </div>

            <div className={classes.statSection}>
                <div className={classes.stat}>
                    PPG
                </div>
                <div className={classes.stat}>
                    TRB
                </div>
                <div className={classes.stat}>
                    APG
                </div>
                <div className={classes.stat}>
                    2FG
                </div>
                <div className={classes.stat}>
                    2FGA
                </div>
                <div className={classes.stat}>
                    3FG
                </div>
                <div className={classes.stat}>
                    3FGA
                </div>
                <div className={classes.percentage}>
                    2Per
                </div>
                <div className={classes.percentage}>
                    3Per
                </div>
                <div className={classes.rebounds}>
                    ORB
                </div>
                <div className={classes.rebounds}>
                    DRB
                </div>
            </div>
        </div>
    )
}

export default HeaderRow