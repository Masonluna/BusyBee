import { useState } from 'react';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import '../styles/button.css';
import { login } from '../service/supabaseService';
import { User } from '../utils/types';


const LoginForm: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLoginSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("SENDING LOGIN REQUEST")
        const form = event.currentTarget;
        const email = form.loginEmail.value;
        const password = form.loginPassword.value;

        const potentialUser: User | null = await login(email, password);
        if (!potentialUser){
            console.log('Error logging in.')
            setErrorMessage("Unable to log you in with those credentials. Please try again, or make an account if you don't have one already.");
            return;
        }
        const user: User = potentialUser;

        navigate('/home', { state: {loggedUser: user}});

    }

    return(
        <>
        <div className="lgnComponentLocation">
            <h1 className="welcomeMessage">Welcome to Busybee</h1>
            <form onSubmit={handleLoginSubmission} className="center">
                <p className="errorMSG">{errorMessage !== "" && <ErrorMessage message={errorMessage}/> }</p>
                <p><label className="labelEmail">Email</label></p>
                <input type="email" placeholder="Email" name="loginEmail" className="loginInput"/>

                <div>
                    <p><label className="labelPassword">Password</label></p>
                    <input type="password" placeholder="Password" name="loginPassword" className="loginInput"/>
                    
                    <p className='forgotPasword'><a onClick={() => navigate('')}>Forgot Password?</a></p>
                </div>

                <button type="submit" className="button">Login</button>
            </form>
        </div>
        </>
    )
}

export default LoginForm;