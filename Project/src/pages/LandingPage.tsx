import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserWithAuthenticationCheck } from '../service/supabaseService';



const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            const potentialUser = await getUserWithAuthenticationCheck();
            if (!potentialUser){
                console.log("Not authenticated.");
                navigate("/login");
                return;
            }
            else{
                navigate("/dashboard");
                return;
            }
        };
        checkAuthStatus();
    }, [navigate]);

    return (
        <div>
            <h1>Welcome to Busybee</h1>
            <h2>Loading...</h2>

        </div>
    )
}

export default LandingPage;