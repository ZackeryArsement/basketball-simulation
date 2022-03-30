import classes from './ListedPlayers.module.css'

import PlayerCard from './playerCard/PlayerCard';

const ListedPlayers = ({ players, team, signPlayer, releasePlayer }) => {

    return(
        <div className={classes.listedPlayers}>
            {players !== [] ?
                players.map((player, index) => (
                    <PlayerCard 
                        player={player} 
                        index={index} 
                        team={team} 
                        signPlayer={signPlayer}
                        releasePlayer={releasePlayer}
                        key={player._id}/>
                ))
                : null 
            }
        </div>
    )
}

export default ListedPlayers;