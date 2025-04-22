import SignUpForm from '../components/SignUpForm';
import { useNavigate } from 'react-router-dom';
import image from '../assets/Busybee-logo.png';
import '../styles/signin.css';
import Footer from '../components/Footer';
const SignUpPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <img src={image} alt='yellow bee' className="imgSize"></img>
            <SignUpForm />
            <p className="center">Already have an account? <a onClick={() => navigate('/login')}>Login</a> instead.</p>
            <Footer />
        </div>
    )
}

export default SignUpPage;