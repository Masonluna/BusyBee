import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EasyNav from '../components/EasyNav';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ErrorMessage from '../components/ErrorMessage';
import JobsDashboard from '../components/jobDash/JobDashboard';
import DashboardLabel from '../components/DashboardLabel';
import SummaryDashboard from '../components/summaryDash/SummaryDashboard';
import {
  type User,
  type Job,
  type JobDto,
  type Group,
  type GroupJob,
  type GroupToJobsDto,
  type UserStats
} from '../utils/types';
import '../styles/jobs-quickview.css';
import {
  getUserWithAuthenticationCheck,
  getJobs,
  getGroups,
  getGroupJobsByGroupIds
} from '../service/supabaseService';
import {
  compileJobDtos,
  compileGroupToJobsList,
  compileIndependentJobs
} from '../service/objectConversionService';
import { calculateUserStats } from '../service/statsCalculationService';
import StatDashboard from '../components/statDash/StatDashboard';
import GroupDashboard from '../components/groupDash/GroupDashboard';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // homepage state variables
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [jobs, setJobs] = useState<JobDto[] | null>(null);
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [groupJobs, setGroupJobs] = useState<GroupJob[] | null>(null);
  const [independentJobs, setIndependentJobs] = useState<JobDto[] | null>(null);
  const [groupsToJobsList, setGroupsToJobsList] = useState<GroupToJobsDto[] | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [selectedDashboard, setSelectedDashboard] = useState<string>("summary");

  // runs onMount: checks authentication
  useEffect(() => {
    const checkUserAuth = async () => {
      const potentialUserObj: User | null = await getUserWithAuthenticationCheck();
      if (!potentialUserObj) {
        console.log('Could not verify authentication on HomePage, navigating to login');
        navigate('/');
        return;
      }
      setUser(potentialUserObj);
    };
    checkUserAuth();
  }, [navigate]);

  // fetches user-specific data when user is loaded and hasn't already loaded
  useEffect(() => {
    const fetchUsersData = async (userId: string) => {
      try {
        setErrorMessage('');

        const potentialJobs: Job[] | null = await getJobs(userId);
        if (!potentialJobs) throw new Error('Error fetching jobs');
        const jobDtos: JobDto[] | null = await compileJobDtos(potentialJobs);
        if (!jobDtos) throw new Error('Error compiling job dtos');
        setJobs(jobDtos);

        const potentialGroups: Group[] | null = await getGroups(userId);
        if (!potentialGroups) throw new Error('Error fetching groups');
        setGroups(potentialGroups);

        const groupIds: number[] = potentialGroups.map(group => group.group_id);
        const potentialGroupJobs: GroupJob[] | null = await getGroupJobsByGroupIds(groupIds);
        if (!potentialGroupJobs) throw new Error('Error fetching group jobs');
        setGroupJobs(potentialGroupJobs);

        setHasLoaded(true); // mark successful fetch
      } catch (err) {
        console.error(err);
        setErrorMessage(
          'There was an error retrieving your data. Please refresh. If the problem persists, contact us.'
        );
      }
    };

    if (user && !hasLoaded) {
      fetchUsersData(user.user_id);
    }
  }, [user, hasLoaded]);

  // compute independent jobs & user stats once jobs and groupJobs are loaded
  useEffect(() => {
    if (!jobs || !groupJobs) return;
    if (jobs.length === 0) return;

    const actualIndependentJobs: JobDto[] = compileIndependentJobs(jobs, groupJobs);
    setIndependentJobs(actualIndependentJobs);

    if (user) {
      const userStats = calculateUserStats(jobs, user);
      setStats(userStats);
    }
  }, [jobs, groupJobs, user]);

  // compute group-to-jobs mapping once all related state is loaded
  useEffect(() => {
    if (!jobs || !groups || !groupJobs) return;

    const groupsToJobs: GroupToJobsDto[] = compileGroupToJobsList(groups, jobs, groupJobs);
    setGroupsToJobsList(groupsToJobs);
  }, [jobs, groups, groupJobs]);

  // clear error if everything has loaded successfully
  useEffect(() => {
    if (jobs && groups && groupJobs) {
      setErrorMessage('');
    }
  }, [jobs, groups, groupJobs]);


    return (
        <div>
            { errorMessage !== "" && <ErrorMessage message={errorMessage} /> }
            
            {user && <Header user={user}/>}
            <DashboardLabel/>
            
            
            <div className="main-container">
                <EasyNav setSelectedDashboard={setSelectedDashboard}/>
                <div className="dashboard-container">

                  {/* Conditionally render the selected dashboard, summary by default. If an option is selected, verify its dependencies are loaded before rendering. */}
                  {selectedDashboard === 'summary' && jobs && stats && <SummaryDashboard jobs={jobs} stats={stats} />}
                  {selectedDashboard === 'jobs' && user && independentJobs && groupsToJobsList && <JobsDashboard user={user} ungroupedJobs={independentJobs} groupToJobsList={groupsToJobsList} />}
                  {selectedDashboard === 'stats' && user && stats && <StatDashboard user={user} stats={stats} />}
                  {selectedDashboard === 'groups' && user && groups && <GroupDashboard user={user} groups={groups} />}

                </div>
            </div>
            
            <Footer></Footer>
        </div>
    )
}

export default HomePage;
