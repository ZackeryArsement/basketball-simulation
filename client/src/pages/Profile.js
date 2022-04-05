import classes from './Profile.module.css'

import Team from '../components/profile/team/Team';
import PlayerRecord from '../components/profile/playerRecord/PlayerRecord';
import UserRecord from '../components/profile/userRecord/UserRecord';

const Profile = () => {
    return(
        <div>
            <Team />
            <div className={classes.records}>
                <div className={classes.playerRecords}>
                    <PlayerRecord />
                </div>
                <div className={classes.userRecords}>
                    <UserRecord />
                </div>
            </div>
        </div>
    )
}

export default Profile;