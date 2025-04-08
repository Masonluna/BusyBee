import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import EasyNav from '../components/EasyNav';
import Footer from '../components/Footer';
import supabase from '../utils/supabase';
import ErrorMessage from '../components/ErrorMessage';
import type { User, Job, Group } from '../utils/types';
import JobsQuickView from '../components/JobsQuickView';
import image from '../assets/Busybee-logo.png';
import '../styles/header.css';
import profile from '../assets/PFP.png';
import DashboardLabel from '../components/DashboardLabel';




const HomePage: React.FC = () => {""
    const navigate = useNavigate();
    

    //homepage state variables
    const [user, setUser] = useState<User>({user_id: "",first_name: "", last_name: "", email: "", date_created: Date.now(), last_accessed: Date.now()});
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [jobs, setJobs] = useState<Job[] | null>(null);
    const [renderJobs, setRenderJobs] = useState<boolean>(false);
    const [groups, setGroups] = useState<Group[] | null>(null);
    

    //this hook runs onMount, checks the authentication, and sets the user state variable
    useEffect(() => {
        const checkAuthentication = async () => {
            const { data: authUser, error: authError } = await supabase.auth.getUser();
            if (authError) {
                console.log(`Error: Must be authenticated to access the Main Dashboard... Redirecting to login.`);
                navigate('/login');
            }
            else if (authUser) {
                const { data: actualUserData, error: actualUserError } = await supabase.from('users').select('*').eq('user_id', authUser.user.id);
                if (actualUserError){
                    console.log(`Error: Could not find that user in public.Users. The user is authenticated tho... This is an internal error. Please try logging in again. If the issue continues, contact support.`);
                    navigate('/login');
                }
                else if(actualUserData && actualUserData.length > 0){
                    setUser(actualUserData[0] as User);
                }
                else{
                    console.log('An unexpected error occurred while pulling the user from public.Users... this is an unexpected, internal error');
                    navigate('/login');
                }
            }
            else{
                console.log('An unexpected error occurred while checking authentication status for access to the Main Dashboard... Redirecting to login.');
                navigate('/login');
            }
        }
        checkAuthentication();
    },[navigate]);

    //this hook runs onMount and when the user.user_id changes
    useEffect(() => {
        const fetchJobs = async () => {
            const { data: jobsData, error: jobsError } = await supabase.from('jobs').select('*').eq("user_id", user.user_id);
            if (jobsError){
                setErrorMessage("Error fetching users jobs...");
            }
            else if (jobsData){
                setJobs(jobsData as Job[]);
            }
            else {
                setErrorMessage("Unexpected error while fetching the users jobs...");
            }
        }
        const fetchGroups = async () => {
            const { data: groupsData, error: groupsError} = await supabase.from('groups').select('*').eq("user_id", user.user_id);
            if (groupsError){
                setErrorMessage("Error fetching users groups...");
            }
            else if (groupsData){
                setGroups(groupsData as Group[]);
            }
            else{
                setErrorMessage("An unexpected error occured while fetching users groups...")
            }
        }
        if (!user.user_id){
            return;
        }
        else{
            fetchJobs();
            fetchGroups();
        }

    }, [user.user_id]);

    useEffect(() => {
        const toggleRenderJobQuickView = () => {
            if (jobs) {
                setRenderJobs(true);
            }
        }
        toggleRenderJobQuickView();
    }, [jobs]);
    
    
    

    //only one return element (div)
    return (
        <div>
            { errorMessage !== "" && <ErrorMessage message={errorMessage} /> }
            
            <header className="header">
                
                <div className='left-container'>
                  <img src={image} alt='yellow bee' className="imgSizeHP"></img>
            
                    <span>
                        { (user.first_name!=="" && user.date_created === user.last_accessed) ? <h1 className="welcomeText">Welcome to Busybee {user.first_name}</h1> : <h1 className="welcomeText">Welcome back {user.first_name}</h1>}
                    </span>
                </div>

                <img src={profile} alt='profile picture icon' className="profile"></img>

            </header>
            <DashboardLabel/>
            <EasyNav />
            { renderJobs && <JobsQuickView jobs={jobs} groups={groups} /> }
            <Footer></Footer>
        </div>
    )
}

export default HomePage;