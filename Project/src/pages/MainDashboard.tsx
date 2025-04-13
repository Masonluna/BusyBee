import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import EasyNav from '../components/EasyNav';
import Footer from '../components/Footer';
import ErrorMessage from '../components/ErrorMessage';
import { type User, type Job, type JobDto, type Group, type GroupJob, type GroupToJobsDto, UserStats } from '../utils/types';
import JobsQuickView from '../components/JobsQuickView';
import image from '../assets/Busybee-logo.png';
import '../styles/header.css';
import profile from '../assets/PFP.png';
import DashboardLabel from '../components/DashboardLabel';
import { getUserWithAuthenticationCheck, getJobs, getGroups, getGroupJobsByGroupIds } from '../service/supabaseService';
import { compileJobDtos, compileGroupToJobsList, compileIndependentJobs } from '../service/objectConversionService';
import StatsQuickView from '../components/StatsQuickView';
import { calculateUserStats } from '../service/statsCalculationService';




const HomePage: React.FC = () => {
    const navigate = useNavigate();
    

    //homepage state variables
    const [user, setUser] = useState<User | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [jobs, setJobs] = useState<JobDto[] | null>(null);
    const [groups, setGroups] = useState<Group[] | null>(null);
    const [groupJobs, setGroupJobs] = useState<GroupJob[] | null>(null);
    const [independentJobs, setIndependentJobs] = useState<JobDto[] | null>(null);
    const [groupsToJobsList, setGroupsToJobsList] = useState<GroupToJobsDto[] | null>(null);
    const [stats, setStats] = useState<UserStats | null>(null)

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



    //this hook runs onMount and when the user.user_id changes
    useEffect(() => {
        setErrorMessage("");
        const fetchUsersData = async (userId: string) => {
            const potentialJobs: Job[] | null = await getJobs(userId);
            if (!potentialJobs){
                console.log("Error fetching jobs");
                setErrorMessage("There was an error retrieving your jobs, please refresh. If the problem persists, contact us.");
            }
            else{
                const actualJobs: Job[] = potentialJobs;
                const jobDtos: JobDto[] | null = await compileJobDtos(actualJobs);
                if (!jobDtos){
                    console.log("Error compiling job dtos");
                }
                setJobs(jobDtos);
            }


            const potentialGroups = await getGroups(userId);
            if (!potentialGroups){
                console.log("Error fetching groups");
                setErrorMessage("There was an error retrieving your groups, please refresh. If the problem persists, contact us.");
                //we terminate the process here because if they have no groups, then they have no group_jobs
                return;
            }
            const actualGroups = potentialGroups;
            setGroups(actualGroups);

            const groupIds: number[] = actualGroups.map(group => group.group_id);
            const potentialGroupJobs = await getGroupJobsByGroupIds(groupIds);
            if (!potentialGroupJobs){
                console.log("Error fetching group jobs");
                setErrorMessage("There was an error retrieving your group-job associations, please refresh. If the problem persists, contact us.");
            }
            const actualGroupJobs = potentialGroupJobs;
            setGroupJobs(actualGroupJobs);
            
            if ( jobs && groupJobs){
                const actualIndependentJobs: JobDto[] = compileIndependentJobs(jobs, groupJobs);
                setIndependentJobs(actualIndependentJobs);
            }
            //here we have all the data processes and loaded into state

            if ( jobs && user ) {
                const userStats = calculateUserStats(jobs, user);
                console.log('userStats: ', userStats);
                setStats(userStats);
            }
        }
            
        if (!user){
            return;
        }
        else{
            fetchUsersData(user.user_id);
        }
    }, [jobs, groupJobs]);


    useEffect(() => {
        //now build dtos using these
        if (jobs && groups && groupJobs){
            const groupsToJobs: GroupToJobsDto[] = compileGroupToJobsList(groups, jobs, groupJobs);
            setGroupsToJobsList(groupsToJobs);
        }
    }, [jobs, groups, groupJobs]);


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
            <EasyNav groups={groups} independentJobs={independentJobs} groupToJobsList={groupsToJobsList} stats={stats} />
            { jobs && <JobsQuickView  jobs={jobs} /> }
            { stats && <StatsQuickView stats={stats} /> }
            <Footer></Footer>
        </div>
    )
}

export default HomePage;