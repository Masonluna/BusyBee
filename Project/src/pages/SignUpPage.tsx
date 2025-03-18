import SignUpForm from '../components/SignUpForm';
import { useNavigate } from 'react-router-dom';

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();


    return (
        <div>
            <h2>Sign Up</h2>
            <SignUpForm />
            <p>Already have an account? <a onClick={() => navigate('/login')}>Login</a> instead.</p>
        </div>
    )
}

export default SignUpPage;