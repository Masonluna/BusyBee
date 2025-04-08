import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import EasyNav from '../components/EasyNav';
import Footer from '../components/Footer';
import ErrorMessage from '../components/ErrorMessage';
import type { User, Job, Group, GroupJob } from '../utils/types';
import JobsQuickView from '../components/JobsQuickView';
import image from '../assets/Busybee-logo.png';
import '../styles/header.css';
import profile from '../assets/PFP.png';
import DashboardLabel from '../components/DashboardLabel';
import { getUserWithAuthenticationCheck, getStatusMap, getJobs, getGroups, getGroupJobs } from '../service/supabaseService';




const HomePage: React.FC = () => {
    const navigate = useNavigate();
    

    //homepage state variables
    const [user, setUser] = useState<User | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [jobs, setJobs] = useState<Job[] | null>(null);
    const [groups, setGroups] = useState<Group[] | null>(null);
    const [groupJobs, setGroupJobs] = useState<GroupJob[] | null>(null);
    const [statusMap, setStatusMap] = useState({});
    

    //this hook runs onMount, checks the authentication, and sets the user state variable
    useEffect(() => {
        const checkUserAuth = async () => {
            const potentialUserObj: User | null = await getUserWithAuthenticationCheck();
            if (!potentialUserObj) {
                console.log("Could not verify authentication on MainDashboard, navigating to login");
                navigate("/");
                return;
            }
            const user: User = potentialUserObj;
            setUser(user);
        }
        checkUserAuth();
    },[navigate]);


    useEffect(() => {
        const initStatMap = async () => {
            const potentialStatusMap: {[key: number] : string} | null = await getStatusMap();
            if (!potentialStatusMap) {
                setErrorMessage('Error fetching statuses, please refresh. If the problem persists, contact us.');
                return;
            }
            const actualStatusMap: {[key: number] : string} = potentialStatusMap;
            setStatusMap(actualStatusMap);
        }
        initStatMap();
    }, []);

    //this hook runs onMount and when the user.user_id changes
    useEffect(() => {
        const fetchUsersData = async (userId: string) => {
            const potentialJobs = await getJobs(userId);
            if (potentialJobs){
                console.log("Error fetching jobs");
                setErrorMessage("There was an error retrieving your jobs, please refresh. If the problem persists, contact us.");
            }
            const actualJobs = potentialJobs;
            setJobs(actualJobs);

            const potentialGroups = await getGroups(userId);
            if (!potentialGroups){
                console.log("Error fetching groups");
                setErrorMessage("There was an error retrieving your groups, please refresh. If the problem persists, contact us.");
            }
            const actualGroups = potentialGroups;
            setGroups(actualGroups);

            const potentialGroupJobs = await getGroupJobs(userId);
            if (!potentialGroupJobs){
                console.log("Error fetching group jobs");
                setErrorMessage("There was an error retrieving your group-job associations, please refresh. If the problem persists, contact us.");
            }
            const actualGroupJobs = potentialGroupJobs;
            setGroupJobs(actualGroupJobs);
            //at this point, the state is loaded with the users jobs, groups, and group_jobs
            //now we can use them to process stats, create dtos for sub dashboard pages, and for the quickViews
        }
            
        if (!user){
            return;
        }
        else{
            fetchUsersData(user.user_id);
        }
    }, [user]);

    
    
    
    

    //only one return element (div)
    return (
        <div>
            { errorMessage !== "" && <ErrorMessage message={errorMessage} /> }
            
            <header className="header">
                
                <div className='left-container'>
                  <img src={image} alt='yellow bee' className="imgSizeHP"></img>
            
                    <span>
                        { user &&
                            (user.date_created !== user.last_accessed ? <h1 className="welcomeText">Welcome to Busybee {user.first_name}</h1> : <h1 className="welcomeText">Welcome back {user.first_name}</h1>)}
                    </span>
                </div>

                <img src={profile} alt='profile picture icon' className="profile"></img>

            </header>
            <DashboardLabel/>
            <EasyNav jobs={jobs} groups={groups} />
            { jobs && <JobsQuickView jobs={jobs}  statusMap={statusMap} /> }

            {/*just for testing*/}
            { groupJobs && groupJobs.map(groupJob => (
                <p key={groupJob.group_job_id}>GroupId: {groupJob.group_id}, JobId: {groupJob.job_id}</p>
            ))}
            <Footer></Footer>
        </div>
    )
}

export default HomePage;