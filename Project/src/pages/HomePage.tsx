import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EasyNav from '../components/EasyNav';
import supabase from '../utils/supabase';
import ErrorMessage from '../components/ErrorMessage';
import type { User, Job, Group } from '../utils/types';





const HomePage: React.FC = () => {""
    const navigate = useNavigate();
    const location = useLocation();

    //homepage state variables
    const [authUser, setAuthUser] = useState<User>({user_id: "",first_name: "", last_name: "", email: "", date_created: Date.now(), last_accessed: Date.now()});
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [jobs, setJobs] = useState<Job[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    
    
    useEffect(() => {
        const fetchUserData = async () => {
            fetchJobs();
            fetchGroups();
        }
        const fetchJobs = async () => {
            const { data: jobsData, error: jobsError } = await supabase.from('jobs').select('*').eq("user_id", authUser.user_id);
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
            const { data: groupsData, error: groupsError} = await supabase.from('groups').select('*').eq("user_id", authUser.user_id);
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
        //ENSURE USER IS LOGGED IN BEFORE FETCHING THEIR DATA
        if (!location.state){
            //user must have manually typed in the url /homepage,
            //redirect to login
            localStorage.clear();
            navigate('/login');
            return;
        }
        else{
            //this loggedUser comes from the Login Form
            //they are authenticated, go ahead and fetch their data
            setAuthUser(location.state.loggedUser);
            
        }

        if (authUser){
            fetchUserData();
            console.log(`Users jobs: ${jobs}`);
            console.log(`Users groups: ${groups}`);
        }
    }, [navigate, location]);


    return (
        <div>
            { errorMessage !== "" && <ErrorMessage message={errorMessage} /> }
            { (authUser.first_name!=="" && authUser.date_created === authUser.last_accessed) ? <h1>Welcome to Busybee {authUser.first_name}</h1> : <h1>Welcome back {authUser.first_name}</h1>}
            <EasyNav />
        </div>
    )
}

export default HomePage;