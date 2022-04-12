import classes from "./GameStats.module.css"

import StatTable from "./statTable/StatTable"

const GameStat = ({ gameStatistics }) => {
    return (
        <div>
            {gameStatistics.length === 3 ? (
                <div>
                    <div className={classes.gameBanner}>
                        <div className={classes.homeBanner}>
                            <div className={classes.score}>
                                {gameStatistics[2][0].score}
                            </div>
                        </div>

                        <div className={classes.vs}>
                            vs
                        </div>

                        <div className={classes.visitorBanner}>
                            <div className={classes.score}>
                                {gameStatistics[2][1].score}
                            </div>
                        </div>
                    </div>

                    <StatTable teamStats={gameStatistics[0]} team='home' teamData={gameStatistics[2][0]}/>
                    <StatTable teamStats={gameStatistics[1]} team='visitor' teamData={gameStatistics[2][1]}/>
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