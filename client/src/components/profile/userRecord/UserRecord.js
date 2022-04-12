import GameTab from "./gameTab/GameTab";

const UserRecord = ({ gameHistory }) => {
    return(
        <div>
            {gameHistory.userGames.map((game) =>(
                    <GameTab game={game} key={game._id}/>
            ))}
        </div>
    )
}

export default UserRecord;