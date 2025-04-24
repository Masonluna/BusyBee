import ErrorMessage from "../components/ErrorMessage";
import { useState } from 'react';
import { resetPassword } from "../service/supabaseService";
import { useNavigate } from 'react-router-dom';


const ResetPassword: React.FC = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleResetPasswordSubmission = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrorMessage("");
        const form = event.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirm-password") as string;

        if (password !== confirmPassword){
            setErrorMessage("Password and confirmation do not match.");
            return;
        }
        if (password.length < 6){
            setErrorMessage("Password must be at least 6 characters long.");
            return;
        }
        //now actually reset the password
        const wasUpdated: boolean = await resetPassword(password);
        if (!wasUpdated){
            console.log("Failed to reset password");
            setErrorMessage("There was an error resetting your password. Please go back to the Forgot Password link to have a new reset password link sent to your email.");
            return;
        }
        console.log("Successfully reset password.");
        //redirect to landing page
        navigate("/");


    }

    return (
        <>
            <h1>Reset Password</h1>
            <form onSubmit={(event) => handleResetPasswordSubmission(event)}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required/>

                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" name="confirm-password" required/>

                <button type="submit">Submit</button>

            </form>
            {errorMessage !== "" && <ErrorMessage message={errorMessage} />}
        </>
    )
}

export default ResetPassword;