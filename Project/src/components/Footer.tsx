import '../styles/footer.css';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
    const navigate = useNavigate();

    return (
     <div className="footer">
        <a onClick={() => navigate('/contact')}>Contact Us</a>
        <a onClick={() => navigate('/about-team')}>About the Team</a>
        <a onClick={() => navigate('/FAQ')}>FAQs</a>
     </div>
    ); 

}

export default Footer;