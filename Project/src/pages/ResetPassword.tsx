import ErrorMessage from "../components/ErrorMessage";
import { useState } from 'react';
import { resetPassword } from "../service/supabaseService";
import { useNavigate } from 'react-router-dom';
import '../styles/forgot-password.css';


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
            <form onSubmit={(event) => handleResetPasswordSubmission(event)}>
                <div className="reset-password-div">


                    <label className="password-reset-label" htmlFor="password">Password</label>
                    <input className="reset-password-input" type="password" id="password" name="password" required />

                    <label className="confirm-reset-password-label" htmlFor="confirm-password">Confirm Password</label>
                    <input className="confirm-reset-password-input" type="password" id="confirm-password" name="confirm-password" required />
                    {errorMessage !== "" && (
                        <div className="error-message-container">
                            <ErrorMessage message={errorMessage} />
                        </div>
                    )}

                    <button className="button" type="submit">Submit</button>
                    <button className="button" onClick={() => navigate('/login')}>← Back</button>
                </div>
            </form>
        </>
    )
}

export default ResetPassword;