import { initiateResetPassword } from "../service/supabaseService";
import ErrorMessage from "../components/ErrorMessage";
import { useState } from 'react';
import '../styles/forgot-password.css';
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();

    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleForgotPasswordSubmission = async (event: React.FormEvent) => {
        event.preventDefault();
        setSuccessMessage("")
        setErrorMessage("");
        const form = event.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const email = formData.get("email") as string;
        if (!email || email.trim() === ""){
            console.log("invalid email entered.");
            setErrorMessage("Please enter the email address your account is associated with.");
            return;
        }
        await initiateResetPassword(email);
        setSuccessMessage("A link has been sent to your email to reset your password. You may close this window.");
    }

    return (
        <>
            <form  onSubmit={(event) => handleForgotPasswordSubmission(event)}>
                <div className="reset-password-div">
                <label className="email-forgot-password" htmlFor="email">Email</label>
                <div className="input-container-forgot-pw">
                    {errorMessage !== "" && (
                         <div className="error-message">
                                <ErrorMessage message={errorMessage} />
                        </div>
                    )}
                    <div className="spacer-reset-pw"></div>
                     <input className="email-input-forgot-pw" type="email" id="email" name="email" placeholder="youremail@gmail.com" />
                     {successMessage !== "" && <p style={{color: "green"}}>{successMessage}</p>}
                </div>
                
                <button className="button" type="submit">Send Reset Password Link</button>
                <button className="button" onClick={() => navigate('/login')}>← Back</button>
                
                </div>
            </form>
        </>
    )
}
export default ForgotPassword;