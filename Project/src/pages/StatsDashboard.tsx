import {useEffect, useState} from 'react';
import { getUserWithAuthenticationCheck } from '../service/supabaseService';
import { useNavigate } from 'react-router-dom';
import { User } from '../utils/types';

const StatsDashboard: React.FC = () => {
    
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const checkUserAuth = async () => {
            const potentialUserObj: User | null = await getUserWithAuthenticationCheck();
            if (!potentialUserObj) {
                console.log("Could not verify authentication on GroupDashboard, navigating to login");
                navigate("/");
                return;
            }
            const user: User = potentialUserObj;
            setUser(user);
        }
        checkUserAuth();
    },[navigate]);
    
    return (
        <>
            <h1>Your Stats</h1>


            {/*Example of accessing user fields. Remove*/}
            {user && <h2>Welcome to your personalized stats dashboard, {user.first_name}</h2>}
        </>
    )
}

export default StatsDashboard;