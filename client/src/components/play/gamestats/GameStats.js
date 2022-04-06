import StatTable from "./statTable/StatTable"

const GameStat = ({ gameStatistics }) => {
    return (
        <div>
            {gameStatistics.length === 2 ? (
                <div>
                    <StatTable teamStats={gameStatistics[0]} team='home'/>
                    <StatTable teamStats={gameStatistics[1]} team='visitor'/>
                </div>
            ) : (
                <div>
                    No game data found...
                </div>
            )}
        </div>
    )
}

export default GameStat