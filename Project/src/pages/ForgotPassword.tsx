import { initiateResetPassword } from "../service/supabaseService";
import ErrorMessage from "../components/ErrorMessage";
import { useState } from 'react';

const ForgotPassword: React.FC = () => {

    const [errorMessage, setErrorMessage] = useState<string>("");


    const handleForgotPasswordSubmission = async (event: React.FormEvent) => {
        event.preventDefault();
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

    }

    return (
        <>
            <form onSubmit={(event) => handleForgotPasswordSubmission(event)}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="youremail@gmail.com" />
                <button type="submit">Send Reset Password Link</button>
            </form>
            {errorMessage !== "" && <ErrorMessage message={errorMessage} />}
        </>
    )
}
export default ForgotPassword;