import classes from './Profile.module.css'

import { useEffect, useState } from 'react';

import Team from '../components/profile/team/Team';
import PlayerRecord from '../components/profile/playerRecord/PlayerRecord';
import UserRecord from '../components/profile/userRecord/UserRecord';

import { useQuery } from '@apollo/client';
import { QUERY_USER_GAMES } from "../components/utils/queries";


const Profile = () => {
    const { loading: gameLoading, data: gameData, refetch: refetchUserGames } = useQuery(QUERY_USER_GAMES);

    const [gameHistory, setGameHistory] = useState(null)
    const [selectedPlayer, setSelectedPlayer] = useState('')

    const selectPlayer = async (e) => {
        setSelectedPlayer(e.target.value)
    }


    useEffect(async ()=>{
        console.log('hit')
        if(!gameLoading){
            console.log('refetch')

            await refetchUserGames();
            console.log('set')
            await setGameHistory(gameData)
            console.log('complete')
        }
    }, [gameData])

    return(
        <div>
            <Team selectPlayer={selectPlayer}/>
            <div className={classes.records}>
                <div className={classes.playerRecords}>
                    <PlayerRecord selectedPlayer={selectedPlayer}/>
                </div>
                
                <div className={classes.userRecords}>
                    {gameHistory ? (
                        <UserRecord gameHistory={gameHistory} selectPlayer={selectPlayer}/>
                    ) : (
                        null
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile;