import { useState } from 'react';
import '../styles/login.css';
import supabase from '../utils/supabase';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import '../styles/button.css';


const LoginForm: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLoginSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("SENDING LOGIN REQUEST")
        const form = event.currentTarget;
        const email = form.loginEmail.value;
        const password = form.loginPassword.value;
        
        
        try{
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
            if (error){
                console.log("Bad login: ", error.code);
                if (error.code === 'invalid_credentials'){
                    setErrorMessage('*Invalid email or password. Try Again.');
                }
                else{
                    setErrorMessage('*Try Again. Double check credentials, or create an account instead.');
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
                    setErrorMessage(`Could not find ${data.user.email} in public.user...`);
                    return;
                }
                else if (userData){
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