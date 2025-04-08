import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import image from '../assets/Busybee-logo.png';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <img src={image} alt='yellow bee' className="imgSize"></img>
            <LoginForm />
            <p className="signUpCTA">Dont have an account? <a onClick={() => navigate('/signup')}>Sign Up</a> instead</p>
        </div>
    )
}


export default LoginPage;