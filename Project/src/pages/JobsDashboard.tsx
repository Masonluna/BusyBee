import {useEffect, useState} from 'react';
import { getUserWithAuthenticationCheck } from '../service/supabaseService';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, GroupToJobsDto, JobDto } from '../utils/types';
import JobList from '../components/jobDash/JobList';
import CreateJobForm from '../components/jobDash/CreateJobForm';
import '../styles/jobsdashboard.css';



const JobsDashboard: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const indJobs: JobDto[] = location.state?.independentJobs;
    const groupToJobsList: GroupToJobsDto[] = location.state?.groupToJobsList;
    
    const [independentJobs, setIndependentJobs] = useState<JobDto[] | null>(null);
    const [selectedGroupIndex, setSelectedGroupIndex] = useState<number | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [creatingJob, setCreatingJob] = useState<boolean>(false);
    
    

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
        <div className='jobDashboardContainer'>

            {!creatingJob && (
                <>
                    {user && <h1>Lets get you hired {user.first_name}</h1>}

                    <button className='createButton' onClick={() => setCreatingJob(true)}>Create Job</button>
                    
                    {groupToJobsList && groupToJobsList.length > 0 && 
                        <h3>Your jobs by group</h3> &&
                        <ul className='groupBar'>
                            {groupToJobsList.map(groupToJobEntry => (
                                <li key={groupToJobEntry.groupDto.group_id}>
                                    <button 
                                        onClick={() => updateSelectedGroupIndex(groupToJobEntry.groupDto.group_id)}
                                        className={(selectedGroupIndex !== null && groupToJobEntry.groupDto.group_id === groupToJobsList[selectedGroupIndex].groupDto.group_id) ? 'selectedGroup' : 'unselectedGroup'}
                                    >
                                        {groupToJobEntry.groupDto.group_name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    }
                    {groupToJobsList && selectedGroupIndex !== null && selectedGroupIndex < groupToJobsList.length &&
                        <JobList jobs={groupToJobsList[selectedGroupIndex].jobs} jobListTitle={groupToJobsList[selectedGroupIndex].groupDto.group_name} />
                    }
                    {groupToJobsList && selectedGroupIndex === null && 
                        <p>Select a group to see some jobs</p>
                    }

                    {independentJobs && independentJobs.length > 0 &&
                        <h3>Your ungrouped jobs</h3> &&
                        <JobList jobs={independentJobs} jobListTitle='Non-Grouped Jobs' />
                    }
                </>
            )}

            {creatingJob && (
                <>
                    {user && <CreateJobForm setCreatingJob={setCreatingJob} userId={user.user_id} independentJobs={independentJobs} setIndependentJobs={setIndependentJobs} />}
                </>
            )}
            

        </div>
    );



}

export default JobsDashboard;