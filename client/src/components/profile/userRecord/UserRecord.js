import classes from './UserRecord.module.css'

import { useEffect, useState } from "react";
import GameTab from "./gameTab/GameTab";

const UserRecord = ({ gameHistory, selectPlayer }) => {
    const [userGames, setUserGames] = useState([]);

    useEffect(async ()=> {
        await setUserGames(gameHistory.userGames)
    },[gameHistory])
    return(
        <div>
            <div className={classes.gameHistory}>
                Game History
            </div>

            {userGames.map((game) =>(
                    <GameTab game={game} key={game._id} selectPlayer={selectPlayer}/>
            ))}
        </div>
    )
}

export default UserRecord;