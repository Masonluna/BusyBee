import supabase from '../utils/supabase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/signin.css';
import '../styles/button.css';


const SignUpForm: React.FC = () => {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUpSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const firstName = form.signUpFirstName.value;
        const lastName = form.signUpLastName.value;
        const email = form.signUpEmail.value;
        const password = form.signUpPassword.value;
        const confPassword = form.signUpConfirmPassword.value;

        if (password !== confPassword){
            setErrorMessage("*Password and confirmation do not match. Please check your entries and try again.");
        }
        //perform other input validation!!!

        const { data, error } = await supabase.auth.signUp(
            {
                email: email,
                password: password,
                options: {
                    data: {
                        first_name: firstName,
                        last_name: lastName
                    }
                }
            }
        );
        if (error){
            console.log(`*Error signing up ${email}: ${error.code}`);
            setErrorMessage(`*Error signing up: ${error.code}`);
        }
        else if (data){
            console.log(`Successfully signed up`);
            navigate('/login');
        }
        else{
            setErrorMessage("*Unexpected error occurred while signing up...");
        }
    }

    return (
        <>
        <div className="center">
            <h1 className="BBMessage">Welcome to BusyBee</h1>
            <label className="registerMessage">Register for Busybee</label>
            <p className="errorMSG">{errorMessage !== '' && <ErrorMessage message={errorMessage}/>}</p>
            <form onSubmit={handleSignUpSubmission} className='space'>
                <label className='labelFN'>First Name</label>
                <label className='labelLN'>Last Name</label>
                    <p>
                        <input className="signInInput" type="text" placeholder="First Name" name="signUpFirstName" />
                        <input className="signInInputLN" type="text" placeholder="Last Name" name="signUpLastName" />
                    </p>
                <label className='labelEMAIL'>Email</label>
                <p>
                <input className="signInEmail" type="email" placeholder="Email" name="signUpEmail" />
                </p>

                <label className='labelPW'>Password</label>
                <label className='labelCPW'>Confirm Password</label>
                    <p>
                         <input className="signInPassword" type="password" placeholder='Password' name="signUpPassword" />
                        <input className="signInPasswordCPW" type="password" placeholder="Confirm Password" name="signUpConfirmPassword" />
                    </p>
                    
                <button type="submit" className="button">Sign Up</button>
            </form>
        </div>
        </>
    )
}

export default SignUpForm;