import classes from './Row.module.css'

const Row = ({ user, rank }) => {
    return (
        <div className={classes.row}>
            <div className={classes.rank}>
                {rank}
            </div>
            <div className={classes.username}>
                {user.username}
            </div>
            <div className={classes.wins}>
                {user.wins}
            </div>
            <div className={classes.losses}>
                {user.losses}
            </div>
            <div className={classes.percentage}>
                {String(user.winPercentage * 100).substring(0,5)} %
            </div>
        </div>
    )
}

export default Row