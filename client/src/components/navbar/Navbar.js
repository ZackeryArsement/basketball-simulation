import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';

// Images
import Basketball from '../../assets/images-2/navbar/basketball.png'
import MoneyBag from '../../assets/images-2/navbar/money-bag-large.png'
import Court from '../../assets/images-2/navbar/basketball-court.png'

import Auth from '../../components/utils/auth'

const Navbar = () => {
    return(
        <div className={classes.navbar}>
            <div className={classes.leftNav}>
                <Link to="/">
                    <img src={Basketball} className={classes.basketball} alt='Homepage Icon'/>
                </Link>
            </div>
            <div className={classes.rightNav}>
                <div className={classes.court}>
                    <img src={Court} className={classes.innerCourt} alt='Play Icon'/>
                </div>

                <Link to="/marketplace">
                    <div className={classes.moneybag}>
                        <img src={MoneyBag} className={classes.innerMoneybag} alt='Marketplace Icon'/>
                    </div>
                </Link>

                <Link to="/profile">
                    <div className={classes.username}>
                        <div className={classes.innerUsername}>
                            <div className={classes.letter}>
                                {Auth.getProfile().data.username[0]}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Navbar;

// Gif
/* <a href="https://www.flaticon.com/free-icons/basketball-court" title="basketball court icons">Basketball court icons created by Freepik - Flaticon</a> */