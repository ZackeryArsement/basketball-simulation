import classes from './Leaderboard.module.css'

import Row from "./row/Row"
import Header from './header/Header'

const Leaderboard = ({ title, userList }) => {
    return (
        <div className={classes.leaderboard}>

            <div className={classes.title}>
                {title}
            </div>

            <div className={classes.rows}>
                <Header />
                {userList.map((user, index) => (
                    <div key={user.username}>
                        <Row user={user} rank={index}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Leaderboard