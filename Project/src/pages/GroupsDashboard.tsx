import {useEffect, useState} from 'react';
import { getUserWithAuthenticationCheck } from '../service/supabaseService';
import { useNavigate } from 'react-router-dom';
import { User } from '../utils/types';

const GroupsDashboard: React.FC = () => {

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
        <h1>Your Groups</h1>



        {/*Another example showing user data is here, definitely remove*/}
        {user && <h2>Manage your groups, {user.first_name}</h2>}
        </>
    );

}

export default GroupsDashboard;