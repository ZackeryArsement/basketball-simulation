import classes from './Header.module.css'

const Header = () => {
    return (
        <div className={classes.header}>
            <div className={classes.username}>
                Username
            </div>
            <div className={classes.wins}>
                W
            </div>
            <div className={classes.losses}>
                L
            </div>
            <div className={classes.winPercentage}>
                W %
            </div>
        </div>
    )
}

export default Header