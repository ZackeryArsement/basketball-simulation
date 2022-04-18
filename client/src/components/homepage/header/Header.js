import classes from './Header.module.css'

const Header = () => {
    return (
        <div className={classes.header}>
            <div className={classes.username}>
                Username
            </div>
            <div className={classes.wins}>
                Wins
            </div>
            <div className={classes.losses}>
                Losses
            </div>
            <div className={classes.winPercentage}>
                Win Percentage
            </div>
        </div>
    )
}

export default Header