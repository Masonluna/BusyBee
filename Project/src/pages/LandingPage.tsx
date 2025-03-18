import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (user) {
                    navigate('/home');
                }
                else{
                    navigate('/login');
                }
            }
            catch (err) {
                console.error('Unexpected Error checking if user is authenticated: ', err);
                navigate('/login');
            }
        };
        checkAuthStatus();
    }, [navigate]);

    return (
        <div>
            <h1>Busybee</h1>

        </div>
    )
}

export default LandingPage;