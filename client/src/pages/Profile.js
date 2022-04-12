import classes from './Profile.module.css'

import { useEffect, useState } from 'react';

import Team from '../components/profile/team/Team';
import PlayerRecord from '../components/profile/playerRecord/PlayerRecord';
import UserRecord from '../components/profile/userRecord/UserRecord';

import { useQuery } from '@apollo/client';
import { QUERY_USER_GAMES } from "../components/utils/queries";


const Profile = () => {
    const { loading: gameLoading, data: gameData, refetch } = useQuery(QUERY_USER_GAMES);
    const [gameHistory, setGameHistory] = useState(null)

    useEffect(async ()=>{
        if(!gameLoading){
            await refetch();
            setGameHistory(gameData)
        }
    }, [gameLoading])

    return(
        <div>
            <Team />
            <div className={classes.records}>
                <div className={classes.playerRecords}>
                    <PlayerRecord />
                </div>
                <div className={classes.userRecords}>
                    {gameHistory ? (
                        <UserRecord gameHistory={gameHistory}/>
                    ) : (
                        null
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile;