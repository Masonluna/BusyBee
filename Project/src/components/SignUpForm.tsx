import supabase from '../utils/supabase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';


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
            setErrorMessage("Password and confirmation do not match. Please check your entries and try again.");
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
            console.log(`Error signing up ${email}: ${error.code}`);
            setErrorMessage(`Error signing up: ${error.code}`);
        }
        else if (data){
            console.log(`Successfully signed up`);
            navigate('/login');
        }
        else{
            setErrorMessage("Unexpected error occurred while signing up...");
        }
    }

    return (
        <>
        <div>
            <h1>Sign Up Form</h1>
            <form onSubmit={handleSignUpSubmission}>
                <input type="text" placeholder="First Name" name="signUpFirstName" />
                <input type="text" placeholder="Last Name" name="signUpLastName" />
                <input type="email" placeholder="Email" name="signUpEmail" />
                <input type="password" placeholder='Password' name="signUpPassword" />
                <input type="password" placeholder="Confirm Password" name="signUpConfirmPassword" />
                <button type="submit">Sign Up</button>
                {errorMessage !== '' && <ErrorMessage message={errorMessage}/>}
            </form>
        </div>
        </>
    )
}

export default SignUpForm;