import { getUserWithAuthenticationCheck } from '../service/supabaseService';
import '../styles/footer.css';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigation = async (path: string) => {
        const authUser = await getUserWithAuthenticationCheck();
        if(!authUser){
            navigate(path, {state: {user: null}})
        }
        else{
            navigate(path, {state: {user: authUser}});
        }
    }

    return (
     <div className="footer">
        <a onClick={() => handleNavigation("/contact")}>Contact Us</a>
        <a onClick={() => handleNavigation('/about-team')}>About the Team</a>
        <a onClick={() => handleNavigation("/FAQ")}>FAQs</a>
     </div>
    ); 

}

export default Footer;