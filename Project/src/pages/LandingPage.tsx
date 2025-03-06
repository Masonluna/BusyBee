import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

function LandingPage() {
    const [showingLogin, setShowingLogin] = useState(true);

    return (
        <>
        <div className="pageContainer">
            <div className="formContainer">
                {showingLogin && <LoginForm />}
                {showingLogin && <p>Don't have an account? <button type='button' onClick={() => setShowingLogin(false)}>Sign Up instead</button> </p>}

                {!showingLogin && <SignUpForm />}
                {!showingLogin && <p>Already have an account? <button type='button' onClick={() => setShowingLogin(true)}>Login instead</button></p>}
            </div>
            
        </div>
        </>
    )

}


export default LandingPage;