import {useEffect, useState} from 'react';
import { getUserWithAuthenticationCheck } from '../service/supabaseService';
import { useNavigate } from 'react-router-dom';
import { User } from '../utils/types';

const JobsDashboard: React.FC = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const checkUserAuth = async () => {
            const potentialUserObj: User | null = await getUserWithAuthenticationCheck();
            if (!potentialUserObj) {
                console.log("Could not verify authentication on JobsDashboard, navigating to login");
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
        <h1>Your Jobs</h1>


        {/*Just an example here of how to conditionally use the user fields*/}
        {user && <h2>Lets get you hired {user.first_name}</h2>}
        </>
    );



}

export default JobsDashboard;