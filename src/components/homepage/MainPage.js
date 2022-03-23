import GSWBanner from '../../assets/images/GSW.jpg';
import { useState, useEffect } from 'react';

const MainPage = () => {
    const [homeGameStats, setHomePlayers] = useState([]);
    const [awayGameStats, setAwayPlayers] = useState([]);

    useEffect(() => {
        let steph = [{
            name: "Steph Curry",
            points: 27,
            FGs: 11,
            FGA: 20,
            FG3s: 5,
            FGA3s: 8,
            Rebounds: 7
        }]

        setHomePlayers(steph);
        console.log(homeGameStats);
    }, [])
    
    return(
        <div>
            <div className="jumbotron jumbotron-fluid m-0 p-0">
                <div className="container">
                    <img className="m-auto w-100 p-0 winning-banner" alt="banner" src={GSWBanner} />
                </div>
            </div>

            <div className="row bg-dark pt-2 pb-2">
                <div className="col-8 m-auto">
                    <div className="row">

                        <div className="col-6 text-center">
                            <div className="w-75 bg-light rounded m-auto">
                                <h1><u className="home-team-name">Home</u></h1>
                                <h1 className="home-team-score">105</h1>
                            </div>
                        </div>

                        <div className="col-6 text-center">
                            <div className="w-75 bg-light rounded m-auto">
                                <h1><u className="visitor-team-name">Visitor</u></h1>
                                <h1 className="visitor-team-score">100</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row bg-secondary">
                <div className="col-8 m-auto">
                    <div className="row bg-secondary p-2 rounded">
                        <div className="col-6 text-center m-auto bg-light rounded">
                            <h1 className="winning-team-name">Golden State Warriors Win!</h1>
                        </div>
                    </div>
                </div>
            </div>

            <table className="table mb-5" id="main-table-home">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">Player</th>
                    <th scope="col">Points</th>
                    <th scope="col">FGs</th>
                    <th scope="col">FGA</th>
                    <th scope="col">3FGs</th>
                    <th scope="col">3FGA</th>
                    <th scope="col">Rebounds</th>
                    </tr>
                </thead>

                <tbody>
                    {homeGameStats.length > 0 &&
                        homeGameStats.map((player) => (
                            <tr key={`${player.name}-stats`}>
                                <th>{player.name}</th>
                                <th>{player.points}</th>
                                <th>{player.FGs}</th>
                                <th>{player.FGA}</th>
                                <th>{player.FG3s}</th>
                                <th>{player.FGA3s}</th>
                                <th>{player.Rebounds}</th>
                            </tr>
                    ))}
                </tbody>
            </table>
                
            <table className="table" id="main-table-visitor">
                <thead className="thead-light">
                <tr>
                    <th scope="col">Player</th>
                    <th scope="col">Points</th>
                    <th scope="col">FGs</th>
                    <th scope="col">FGA</th>
                    <th scope="col">3FGs</th>
                    <th scope="col">3FGA</th>
                    <th scope="col">Rebounds</th>
                </tr>
                </thead>

                <tbody>
                    {awayGameStats.length > 0 &&
                        awayGameStats.map((player) => (
                            <tr>
                                {player.map((stat) => (
                                    <th>{stat}</th>
                                ))}
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )}

export default MainPage;