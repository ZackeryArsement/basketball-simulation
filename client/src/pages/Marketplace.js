import { useEffect, useState } from "react";
import React from "react";

import SearchBar from "../components/marketplace/searchbar/SearchBar";
import ListedPlayers from "../components/marketplace/listedPlayers/ListedPlayers";
import TeamDisplay from "../components/marketplace/teamDisplay/TeamDisplay";

import classes from "./Marketplace.module.css"

// Database Imports
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_PLAYERS } from '../components/utils/queries';
import { QUERY_USER_TEAM } from "../components/utils/queries";
import { RECRUIT_PLAYER } from '../components/utils/mutations'
import { CLEAR_TEAM } from '../components/utils/mutations'

const Marketplace = () => {
    //Mutations/Queries
    const { loading: loadingR, data: dataR } = useQuery(QUERY_PLAYERS);
    const { loading: loadingT, data: dataT, refetch } = useQuery(QUERY_USER_TEAM);
    const [clearTeam] = useMutation(CLEAR_TEAM);
    const [recruitPlayer] = useMutation(RECRUIT_PLAYER);

    const [team, setTeam] = useState([]);
    const [players, setPlayers] = useState([]);

    //Add players to your roster
    const signPlayer = (e) => {
        if(team.length <5 ){
            let selectedPlayer = players.filter(player => {
                return player._id === e.target.value
            })
    
            setTeam(team => [...team, selectedPlayer[0]])
        } else{
            console.log('Already have 5')
        }
      };

    //Release player from your roster
    const releasePlayer = (e) => {
        let tempTeam = team.filter(currentPlayer => currentPlayer._id !== e.target.value);

        setTeam(tempTeam)
    }

    const finalizeTeam = async () => {
        if(team.length === 5){
            try{
                await clearTeam( {
                    variables: {
                        id: '123'
                    }
                });
                
                const mapTeam = async () => {
                    await team.map((player) => {
                        // console.log(player)
                        recruitPlayer({
                            variables: {
                                id: player._id,
                                name: player.name
                            }
                        })
                    })
                }
                await mapTeam();
            } catch (err){
                console.log(err)
            }

            // console.log('second')
            // await refetch();

        }
    }
    useEffect(()=>{
        if(!loadingR){
            setPlayers(dataR.players)
        }

    }, [loadingR])

    useEffect(async ()=>{
        if(!loadingT && team.length === 0){
            await refetch();
            setTeam(dataT.userTeam.team)
            console.log(dataT.userTeam.team)
        }
    }, [loadingT])

    return(
        <div className={classes.marketPlace}>
            <div className={classes.searchBar}>
                <SearchBar/>
                <TeamDisplay 
                    team={team} 
                    releasePlayer={releasePlayer}
                    finalizeTeam={finalizeTeam}/>
            </div>

            <div className={classes.listedPlayers}>
                <ListedPlayers 
                    players={players} 
                    team={team} 
                    signPlayer={signPlayer}
                    releasePlayer={releasePlayer}/>
            </div>
        </div>
    )
}

export default Marketplace;