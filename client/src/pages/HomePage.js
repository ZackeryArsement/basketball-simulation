import classes from './HomePage.module.css'

import { useState, useEffect } from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_USER_TOP_WINS } from '../components/utils/queries';
import { QUERY_USER_TOP_WIN_PERCENTAGE } from '../components/utils/queries';

import Leaderboard from '../components/homepage/Leaderboard';

import LoadingBasketball from '../assets/images-2/loading/basketballLoading.gif'

const HomePage = () => {
    const [topPercentagePlayers, setTopPercentagePlayers] = useState([]);
    const [topWinPlayers, setTopWinPlayers] = useState([]);
    const [fetching, setFetching] = useState(true)

    const { loading: userWinsLoading, data: userWinsData, refetch: refetchUserWins } = useQuery(QUERY_USER_TOP_WINS);
    const { loading: userPercentageLoading, data: userPercentageData, refetch: refetchUserPercentage } = useQuery(QUERY_USER_TOP_WIN_PERCENTAGE);
    
    useEffect(async () => {
        setFetching(true)

        if(!userWinsLoading){
            setFetching(true)
            await refetchUserWins()
            await setTopWinPlayers(userWinsData);
            setFetching(false)
        }
    }, [userWinsLoading])

    useEffect(async () => {
        setFetching(true)

        if(!userPercentageLoading){
            setFetching(true)
            await refetchUserPercentage()
            await setTopPercentagePlayers(userPercentageData);
            setFetching(false)
        }
    }, [userPercentageLoading])

    return(
        <div className={classes.homePage}>
            
            <img src={LoadingBasketball} alt="loading..." className={classes.loading} style={(fetching) ? {display: "block"} : {display: 'none'}}></img>

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

// Gif link
// https://media.giphy.com/media/l0Iykgq3WvaC6TTy0/giphy.gif