import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import EasyNav from '../components/EasyNav';
import Footer from '../components/Footer';
import ErrorMessage from '../components/ErrorMessage';
import type { User, Job, Group } from '../utils/types';
import JobsQuickView from '../components/JobsQuickView';
import { getUserWithAuthenticationCheck, getStatusMap, getJobs, getGroups } from '../utils/supabaseService';




const HomePage: React.FC = () => {
    const navigate = useNavigate();
    

    //homepage state variables
    const [user, setUser] = useState<User>({user_id: "",first_name: "", last_name: "", email: "", date_created: Date.now(), last_accessed: Date.now()});
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [jobs, setJobs] = useState<Job[] | null>(null);
    const [renderJobs, setRenderJobs] = useState<boolean>(false);
    const [groups, setGroups] = useState<Group[] | null>(null);
    const [statusMap, setStatusMap] = useState({});
    

    //this hook runs onMount, checks the authentication, and sets the user state variable
    useEffect(() => {
        const checkUserAuth = async () => {
            try {
                const potentialUserObj: User | undefined = await getUserWithAuthenticationCheck();
                if (potentialUserObj) {
                    setUser(potentialUserObj);
                }
            }
            catch (error){
                console.log('Error checking authentication: ', error);
                navigate('/');
            }
        }
        checkUserAuth();
    },[navigate]);

    useEffect(() => {
        const toggleRenderJobQuickView = () => {
            if (jobs) {
                setRenderJobs(true);
            }
        }
        toggleRenderJobQuickView();
    }, [jobs, groups, statusMap]);

    useEffect(() => {
        const initStatMap = async () => {
            const potentialStatusMap: {[key: number] : string} | null = await getStatusMap();
            if (potentialStatusMap) {
                setStatusMap(potentialStatusMap);
            }
            else {
                setErrorMessage('Error fetching statuses, please refresh. If the problem persists, contact us.');
            }
        }
        initStatMap();
    }, []);

    //this hook runs onMount and when the user.user_id changes
    useEffect(() => {
        const fetchUsersData = async (userId: string) => {
            const potentialJobs = await getJobs(userId);
            if (potentialJobs){
                setJobs(potentialJobs);
            }
            const potentialGroups = await getGroups(userId);
            if (potentialGroups){
                setGroups(potentialGroups);
            }
            if (!potentialJobs || !potentialGroups){
                setErrorMessage('Error fetching groups and jobs, please refresh. If the problem persists, contact us.');
            }
        }
            
        if (!user.user_id){
            return;
        }
        else{
            fetchUsersData(user.user_id);
        }
    }, [user.user_id]);

    
    
    
    

    //only one return element (div)
    return (
        <div>
            { errorMessage !== "" && <ErrorMessage message={errorMessage} /> }
            { (user.first_name!=="" && user.date_created === user.last_accessed) ? <h1>Welcome to Busybee {user.first_name}</h1> : <h1>Welcome back {user.first_name}</h1>}
            <EasyNav jobs={jobs} groups={groups} />
            { renderJobs && <JobsQuickView jobs={jobs} groups={groups} statusMap={statusMap}/> }
            <Footer></Footer>
        </div>
    )
}

export default HomePage;