import classes from './ListedPlayers.module.css'
import { useEffect, useState } from 'react';

import PlayerCard from './playerCard/PlayerCard';

// Database Imports
import { useQuery } from '@apollo/client'
import { QUERY_PLAYERS } from '../../utils/queries';

const ListedPlayers = () => {

    const { loading, data } = useQuery(QUERY_PLAYERS);
    const [players, setPlayers] = useState([]);

    useEffect(()=>{
        if(!loading){
            console.log(data.players)
            setPlayers(data.players)
        }
    }, [data])

    return(
        <div className={classes.listedPlayers}>
            {players !== [] ?
                <PlayerCard players={players} />
                : null 
            }
        </div>
    )
}

export default ListedPlayers;