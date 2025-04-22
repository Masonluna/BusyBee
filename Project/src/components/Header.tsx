import '../styles/header.css';
import image from '../assets/Busybee-logo.png';
import { User } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';

type HeaderProps = {
    user: User | null;
}
const Header: React.FC<HeaderProps> = ({ user }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const handleLogoClick = () => {
        if (user) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            <header className="header">
                <div className='left-container'>
                     <div className="logo-container" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                        <img src={image} alt='yellow bee' className="imgSizeHP"/>
                    </div>
                    {user && (
                        <h1 className="welcomeText">
                            {(user.first_name !== "" && user.date_created === user.last_accessed)
                                ? `Welcome to Busybee ${user.first_name}`
                                : `Welcome back ${user.first_name}`}
                        </h1>
                    )}
                    {!user && (
                        <h1 className="welcomeText">
                            Welcome to Busybee
                        </h1>
                    )}
                </div>

                <div className="right-container">
                    {user && <ProfileMenu onLogout={handleLogout} />}
                </div>
            </header>
            <div className="custom-divider"></div>
        </>
    )
}


export default Header;