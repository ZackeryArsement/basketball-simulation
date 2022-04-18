import { useEffect, useState } from "react"
import classes from "./GameStats.module.css"

import StatTable from "./statTable/StatTable"

const GameStat = ({ gameStatistics }) => {
    const [winner, setWinner] = useState('');

    useEffect(() => {
        if(gameStatistics.length === 3){
            if(gameStatistics[2][0].score > gameStatistics[2][1].score){
                setWinner('home')
            } else {
                setWinner('visitor')
            }
        }
    }, [gameStatistics])

    return (
        <div>
            {gameStatistics.length === 3 ? (
                <div className={classes.updated}>
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

                    <StatTable teamStats={gameStatistics[0]} team='home' teamData={gameStatistics[2][0]} winner={winner}/>
                    <StatTable teamStats={gameStatistics[1]} team='visitor' teamData={gameStatistics[2][1]} winner={winner}/>
                </div>
            ) : (
                <div className={classes.default}>
                    <div className={classes.noData}>
                        No game data found...
                    </div>
                </div>
            )}
        </div>
    )
}

export default GameStat