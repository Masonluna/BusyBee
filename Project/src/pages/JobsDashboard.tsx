import {useEffect, useState} from 'react';
import { getUserWithAuthenticationCheck } from '../service/supabaseService';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Job, GroupToJobsDto, JobDto } from '../utils/types';
import JobList from '../components/JobList';




const JobsDashboard: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const independentJobs: JobDto[] = location.state?.independentJobs;
    const groupToJobsList: GroupToJobsDto[] = location.state?.groupToJobsList;
    console.log(`groupToJobsList=${groupToJobsList}`)
    const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
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


    const updateSelectedGroupIndex = (groupId: number) => {
        for (let i = 0; i < groupToJobsList.length; i++){
            if (groupToJobsList[i].groupDto.group_id === groupId){
                setSelectedGroupIndex(i);
                break;
            }
        }
    }


    return (
        <>
            <h1>Your Jobs</h1>

            {/*Just an example here of how to conditionally use the user fields*/}
            {user && <h2>Lets get you hired {user.first_name}</h2>}

            
            {groupToJobsList && groupToJobsList.length > 0 &&
                groupToJobsList.map(groupToJobEntry => (
                    <li key={groupToJobEntry.groupDto.group_id}>
                        <button onClick={() => updateSelectedGroupIndex(groupToJobEntry.groupDto.group_id)}>{groupToJobEntry.groupDto.group_name}</button>
                    </li>
                ))
            }
            {groupToJobsList && selectedGroupIndex < groupToJobsList.length &&
                <JobList jobs={groupToJobsList[selectedGroupIndex].jobs} />
            }

        </>
    );



}

export default JobsDashboard;