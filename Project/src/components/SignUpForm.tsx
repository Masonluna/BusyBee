import supabase from '../utils/supabase';
import { useNavigate } from 'react-router-dom';


const SignUpForm: React.FC = () => {

    const navigate = useNavigate();

    const handleSignUpSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const firstName = form.signUpFirstName.value;
        const lastName = form.signUpLastName.value;
        const email = form.signUpEmail.value;
        const password = form.signUpPassword.value;
        const confPassword = form.signUpConfirmPassword.value;

        const errorNotification = document.getElementById('signUpErrorNotification');
        if (errorNotification === null) return;

        if (password !== confPassword){
            errorNotification.innerText = "Password and confirmation do not match. Please check your entries and try again."
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
            errorNotification.innerText = `Error signing up: ${error.code}`;
        }
        else if (data){
            console.log(`Successfully signed up`);
            navigate('/login');
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
                <p id="signUpErrorNotification" className="errorNotificationText"></p>
            </form>
        </div>
        </>
    )
}

export default SignUpForm;