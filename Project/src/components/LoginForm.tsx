import '../styles/login.css';
import supabase from '../utils/supabase';
import { useNavigate } from 'react-router-dom';


const LoginForm: React.FC = () => {
    const navigate = useNavigate();

    const handleLoginSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("SENDING LOGIN REQUEST")
        const form = event.currentTarget;
        const email = form.loginEmail.value;
        const password = form.loginPassword.value;
        const errorNotification = document.getElementById("loginErrorNotification");
        if (errorNotification === null) return;
        try{
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
            if (error){
                console.log("Bad login: ", error.code);
                if (error.code === 'invalid_credentials'){
                    errorNotification.innerText = 'Invalid credentials, please check your email and password and try again';
                }
                else{
                    errorNotification.innerText = 'Could not log in, double check that you have the correct credentials, or create an account instead.';
                }
                return;
            }
            else if (data){
                console.log('successful login: ', data);
                console.log('fetching user from public.user');
                const user_id = data.user.id;
                const { data: userData, error: userError } = await supabase.from("users").select('*').eq('user_id', user_id);
                if (userError){
                    console.log(`could not find ${data.user.email} in public.user...`);
                    console.log('error: ', userError.code);
                    errorNotification.innerText = `Could not find ${data.user.email} in public.user...`;
                    return;
                }
                else if (userData){
                    console.log(`successfully found ${userData[0].email} in public.user...`);
                    console.log(`date_created=${userData[0].date_created}`);
                    console.log(`last_accessed=${userData[0].last_accessed}`);
                    //update last_accessed
                    const new_last_accessed_timestamp = new Date().toISOString();
                    const { error: updateError } = await supabase.from("users").update({ last_accessed: new_last_accessed_timestamp}).eq("user_id", user_id)
                    if (updateError){
                        console.log("Error updating the last_accessed time for ", userData[0].email);
                    }
                    navigate('/home', { state: {loggedUser: userData[0]}});
                }
            }
        }
        catch(err) {
            console.log('Unexpected error sending login request... ', err);
        }
    }

    return(
        <>
        <div>
            <h1>Login Form</h1>
            <form onSubmit={handleLoginSubmission}>
                <input type="email" placeholder="Email" name="loginEmail" />
                <input type="password" placeholder="Password" name="loginPassword" />

                {/*error/red*/}
                <p id='loginErrorNotification' className='errorNotificationText'></p>
                <button type="submit">Login</button>
            </form>
        </div>
        </>
    )
}

export default LoginForm;