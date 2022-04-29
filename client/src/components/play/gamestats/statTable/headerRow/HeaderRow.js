import classes from './HeaderRow.module.css'

const HeaderRow = () => {
    return(
        <div className={classes.row}>
            <div className={classes.name}>
            </div>

            <div className={classes.statSection}>
                <div className={classes.stat}>
                    PTS
                </div>
                <div className={classes.stat}>
                    TRB
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
                <div className={classes.stat}>
                    ORB
                </div>
                <div className={classes.stat}>
                    DRB
                </div>
                <div className={classes.stat}>
                    BLK
                </div>
            </div>
        </div>
    )
}

export default HeaderRow