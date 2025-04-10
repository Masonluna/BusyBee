import '../styles/header.css';
import profile from '../assets/PFP-icon.png';
import image from '../assets/Busybee-logo.png';
import {User} from '../utils/types';
 
type HeaderProps = {
    user: User;
}
const Header: React.FC<HeaderProps> = ({user}) => {

    return (
        <>
        <header className="header">
                
                <div className='left-container'>
                  <img src={image} alt='yellow bee' className="imgSizeHP"></img>
            
                    <span>
                        { (user.first_name!=="" && user.date_created === user.last_accessed) ? <h1 className="welcomeText">Welcome to Busybee {user.first_name}</h1> : <h1 className="welcomeText">Welcome back {user.first_name}</h1>}
                    </span>
                </div>

                <img src={profile} alt='profile picture icon' className="profile"></img>

            </header>
        </>
    )
}


export default Header;
