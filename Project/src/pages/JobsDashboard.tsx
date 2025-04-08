import {useEffect, useState} from 'react';
import { getUserWithAuthenticationCheck } from '../service/supabaseService';
import { useNavigate } from 'react-router-dom';
import { User, Job, GroupToJobsDto } from '../utils/types';


type JobsDashboardProps = {
    groupsToJobs: GroupToJobsDto[],
    independentJobs: Job[]
}

const JobsDashboard: React.FC<JobsDashboardProps> = ({groupsToJobs, independentJobs}) => {
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