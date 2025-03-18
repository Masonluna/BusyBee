import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Login</h1>
            <LoginForm />
            <p>Dont have an account? <a onClick={() => navigate('/signup')}>Sign Up</a> instead</p>
        </div>
    )
}


export default LoginPage;