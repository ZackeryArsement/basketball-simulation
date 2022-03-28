import SearchBar from "../components/marketplace/searchbar/SearchBar";
import ListedPlayers from "../components/marketplace/listedPlayers/ListedPlayers";

import classes from "./Marketplace.module.css"

const Marketplace = () => {
    return(
        <div className={classes.marketPlace}>
            <div className={classes.searchBar}>
                <SearchBar/>
            </div>

            <div className={classes.listedPlayers}>
                <ListedPlayers/>
            </div>
        </div>
    )
}

export default Marketplace;