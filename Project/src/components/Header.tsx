import '../styles/header.css';
import image from '../assets/Busybee-logo.png';
import { User } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';

type HeaderProps = {
    user: User;
}
const Header: React.FC<HeaderProps> = ({ user }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <>
            <header className="header">

                <div className='left-container'>
                    <img src={image} alt='yellow bee' className="imgSizeHP"></img>

                    <span>
                        {(user.first_name !== "" && user.date_created === user.last_accessed) ? <h1 className="welcomeText">Welcome to Busybee {user.first_name}</h1> : <h1 className="welcomeText">Welcome back {user.first_name}</h1>}
                    </span>
                </div>

                <ProfileMenu onLogout={handleLogout} />

            </header>
            <div className="custom-divider"></div>
        </>
    )
}


export default Header;
