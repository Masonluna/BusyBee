import {useEffect, useState} from 'react';
import { getUserWithAuthenticationCheck } from '../service/supabaseService';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, UserStats } from '../utils/types';

const StatsDashboard: React.FC = () => {
    
    const navigate = useNavigate();
    const location = useLocation();

    const stats: UserStats = location.state?.stats;

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const checkUserAuth = async () => {
            const potentialUserObj: User | null = await getUserWithAuthenticationCheck();
            if (!potentialUserObj) {
                console.log("Could not verify authentication on StatDashboard, navigating to login");
                navigate("/");
                return;
            }
            const user: User = potentialUserObj;
            setUser(user);
        }
        checkUserAuth();
    },[navigate]);
    
    console.log('Stats: ', stats);

    return (
        <>
            <h1>Your Stats</h1>


            {/*Example of accessing user fields. Remove*/}
            {user && <h2>Welcome to your personalized stats dashboard, {user.first_name}</h2>}
            {user && stats && 
                <div>
                    <p>Total Applications Submitted: {stats.totalApps}</p>
                    <p>Number of applications submitted this month: {stats.appsThisMonth}</p>
                    <p>Average applications submitted per month: {stats.appsPerMonth}</p>
                    <p>Applications left to hit your monthly goal: {stats.appsNeededForGoal}</p>
                </div>
            }
        </>
    )
}

export default StatsDashboard;