import classes from './PlayerRecord.module.css'

import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import { QUERY_USER_PLAYER_GAMES } from '../../utils/queries'

import HeaderRow from './headerRow/HeaderRow';
import PlayerRow from './playerRow/PlayerRow';

const PlayerRecord = ({ selectedPlayer }) => {
    const { loading: playerGamesLoading, data: playerGamesData, refetch:refetchPlayerGames } = useQuery(QUERY_USER_PLAYER_GAMES, {
        variables: {
            name: selectedPlayer
        },
    })
    const [playerHistory, setPlayerHistory] = useState(null)

    useEffect(async () => {
        await refetchPlayerGames();
    }, [selectedPlayer])

    useEffect(async () => {
        if(!playerGamesLoading && playerGamesData.userPlayerGames !== null){
            await setPlayerHistory([...playerGamesData.userPlayerGames.gameStats].reverse())
        }
    }, [playerGamesData])


    return(
        <div className={classes.playerHistory}>
            <div className={classes.title}>
                Player History
            </div>

            {playerHistory ? (
                <div>
                    <HeaderRow />
                    {playerHistory.map((stats) => (
                        <div key={stats._id}>
                            <PlayerRow playerStat={stats}/>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={classes.selectPlayer}>
                    Please Click on a Player Name...
                </div>
            )

            }
        </div>
    )
}

export default PlayerRecord;