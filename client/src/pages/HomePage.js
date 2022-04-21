import classes from './HomePage.module.css'

import { useState, useEffect } from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_USER_TOP_WINS } from '../components/utils/queries';
import { QUERY_USER_TOP_WIN_PERCENTAGE } from '../components/utils/queries';

import Leaderboard from '../components/homepage/Leaderboard';

const HomePage = () => {
    const [topPercentagePlayers, setTopPercentagePlayers] = useState([]);
    const [topWinPlayers, setTopWinPlayers] = useState([]);

    const { loading: userWinsLoading, data: userWinsData, refetch: refetchUserWins } = useQuery(QUERY_USER_TOP_WINS);
    const { loading: userPercentageLoading, data: userPercentageData, refetch: refetchUserPercentage } = useQuery(QUERY_USER_TOP_WIN_PERCENTAGE);
    
    useEffect(async () => {
        if(!userWinsLoading){
            await refetchUserWins()
            await setTopWinPlayers(userWinsData);
        }
    }, [userWinsLoading])

    useEffect(async () => {
        if(!userPercentageLoading){
            await refetchUserPercentage()
            await setTopPercentagePlayers(userPercentageData);
        }
    }, [userPercentageLoading])

    return(
        <div className={classes.homePage}>
            {topPercentagePlayers.length !== 0 ? (
                <Leaderboard title="Top Win Percentage Users" userList={topPercentagePlayers.topPercentageUsers}/>
            ) : ( null )
            }

            {topWinPlayers.length !== 0 ? (
                <Leaderboard title="Top Total Wins Users" userList={topWinPlayers.topWinUsers}/>
            ) : ( null )
            }
        </div>
    )}

export default HomePage;