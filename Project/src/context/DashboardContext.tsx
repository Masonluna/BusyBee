import { createContext } from 'react';
import type { User, JobDto, Group, GroupJob, GroupToJobsDto, UserStats } from '../utils/types';


export const DashboardContext = createContext<{
  user: User | null;
  jobs: JobDto[] | null;
  groups: Group[] | null;
  groupJobs: GroupJob[] | null;
  independentJobs: JobDto[] | null;
  groupsToJobsList: GroupToJobsDto[] | null;
  stats: UserStats | null;
  hasLoaded: boolean;
  errorMessage: string;
  selectedDashboard: string;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setJobs: React.Dispatch<React.SetStateAction<JobDto[] | null>>;
  setGroups: React.Dispatch<React.SetStateAction<Group[] | null>>;
  setGroupJobs: React.Dispatch<React.SetStateAction<GroupJob[] | null>>;
  setIndependentJobs: React.Dispatch<React.SetStateAction<JobDto[] | null>>;
  setGroupsToJobsList: React.Dispatch<React.SetStateAction<GroupToJobsDto[] | null>>;
  setStats: React.Dispatch<React.SetStateAction<UserStats | null>>;
  setHasLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setSelectedDashboard: React.Dispatch<React.SetStateAction<string>>;
}>({
    user: null,
    jobs: null,
    groups: null,
    groupJobs: null,
    independentJobs: null,
    groupsToJobsList: null,
    stats: null,
    hasLoaded: false,
    errorMessage: "",
    selectedDashboard: 'summary',
    setUser: () => {},
    setJobs: () => {},
    setGroups: () => {},
    setGroupJobs: () => {},
    setIndependentJobs: () => {},
    setGroupsToJobsList: () => {},
    setStats: () => {},
    setHasLoaded: () => {},
    setErrorMessage: () => {},
    setSelectedDashboard: () => {},
});


