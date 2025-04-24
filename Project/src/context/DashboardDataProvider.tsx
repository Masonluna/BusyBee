import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserWithAuthenticationCheck, getJobs, getGroups, getGroupJobsByGroupIds } from '../service/supabaseService';
import { compileJobDtos, compileGroupToJobsList, compileIndependentJobs } from '../service/objectConversionService';
import { calculateUserStats } from '../service/statsCalculationService';
import type { User, Job, JobDto, Group, GroupJob, GroupToJobsDto, UserStats } from '../utils/types';
import { DashboardContext } from './DashboardContext';

export const DashboardDataProvider = ({ children }: {children: React.ReactNode}) => {
    const navigate = useNavigate();

    // main dashboard state variables
    const [user, setUser] = useState<User | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [jobs, setJobs] = useState<JobDto[] | null>(null);
    const [groups, setGroups] = useState<Group[] | null>(null);
    const [groupJobs, setGroupJobs] = useState<GroupJob[] | null>(null);
    const [independentJobs, setIndependentJobs] = useState<JobDto[] | null>(null); //jobs not contained in any group
    const [groupsToJobsList, setGroupsToJobsList] = useState<GroupToJobsDto[] | null>(null); //a list of groups mapped to their jobLists
    const [stats, setStats] = useState<UserStats | null>(null);
    const [hasLoaded, setHasLoaded] = useState<boolean>(false);
    const [selectedDashboard, setSelectedDashboard] = useState<string>('summary');

    //runs onMount: checks authentication
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

    //fetches user specific data when user is loaded and data hasn't already been loaded
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

        if (user && !hasLoaded){
            fetchUsersData(user.user_id);
        }
    }, [user, hasLoaded]);


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


    //updated independentJobs when groupsToJobsList changes
    useEffect(() => {
        if (!jobs || !groupJobs) return;
        if (jobs.length === 0) return;

        const actualIndependentJobs: JobDto[] = compileIndependentJobs(jobs, groupJobs);
        setIndependentJobs(actualIndependentJobs);
    }, [groupsToJobsList, jobs, groups, groupJobs]);

    //clear error if everything loaded successfully
    useEffect(() => {
        if (jobs && groups && groupJobs){
            setErrorMessage("");
        }
    }, [jobs, groups, groupJobs]);

    const contextValue = {
        user,
        jobs,
        groups,
        groupJobs,
        independentJobs,
        groupsToJobsList,
        stats,
        hasLoaded,
        errorMessage,
        selectedDashboard,
        setUser,
        setJobs,
        setGroups,
        setGroupJobs,
        setIndependentJobs,
        setGroupsToJobsList,
        setStats,
        setHasLoaded,
        setErrorMessage,
        setSelectedDashboard,
    };

    return (
        <DashboardContext.Provider value={contextValue}>
            {children}
        </DashboardContext.Provider>
    )
}




