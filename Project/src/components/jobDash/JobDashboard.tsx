import {SetStateAction, useEffect, useState} from 'react';
import { User, GroupToJobsDto, JobDto } from '../../utils/types';
import JobList from './JobList';
import CreateJobForm from './CreateJobForm';
import JobDetailsModal from './JobDetailsModal';
import '../../styles/jobsdashboard.css';
import plusSign from '../../assets/Busybee-plus-02.png';
import ErrorMessage from '../ErrorMessage';


type JobsDashboardProps = {
    user: User,
    allJobs: JobDto[],
    ungroupedJobs: JobDto[],
    groupToJobsList: GroupToJobsDto[],
    setJobs: React.Dispatch<SetStateAction<JobDto[] | null>>;
};

const JobsDashboard: React.FC<JobsDashboardProps> = ({ user, allJobs, ungroupedJobs, groupToJobsList, setJobs }) => {

    const [independentJobs, setIndependentJobs] = useState<JobDto[] | null>(null);
    const [selectedGroupIndex, setSelectedGroupIndex] = useState<number | null>(null);
    const [creatingJob, setCreatingJob] = useState<boolean>(false);
    const [showingJobDetails, setShowingJobDetails] = useState<boolean>(false);
    const [selectedJob, setSelectedJob] = useState<JobDto | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    
    // This useEffect keeps independentJobs in sync with the ungroupedJobs prop
    useEffect(() => {
        setIndependentJobs(ungroupedJobs);
        setErrorMessage("");
    }, [ungroupedJobs]);

    // Reset selectedGroupIndex when groupToJobsList changes to prevent out of range issues
    useEffect(() => {
        setErrorMessage("");
        if (selectedGroupIndex !== null && 
            (groupToJobsList.length === 0 || selectedGroupIndex >= groupToJobsList.length)) {
            setSelectedGroupIndex(null);
        }
    }, [groupToJobsList, selectedGroupIndex]);

    const updateSelectedGroupIndex = (groupId: number) => {
        setErrorMessage("");
        for (let i = 0; i < groupToJobsList.length; i++){
            if (groupToJobsList[i].groupDto.group_id === groupId){
                setSelectedGroupIndex(i);
                break;
            }
        }
    }

    // now handle modal opening and closing when a job is clicked...

    const handleJobClick = (job: JobDto) => {
        setErrorMessage("");
        setSelectedJob(job);
        setShowingJobDetails(true);
    }

    const closeModal = () => {
        setErrorMessage("");
        setShowingJobDetails(false);
    }

    return (
        <div> 
            {!creatingJob && (
                <>
                    <div>
                        <h1 className="hired-CTA">Let's get you hired!</h1>
                    </div>
                    
                    <div className='your-jobs-container'>
                        <h3 className="your-jobs">Your Jobs</h3>
                        <button className="createButton-dash" onClick={() => setCreatingJob(true)}>
                            <img src={plusSign} alt="yellow plus sign" className="plus-sign-size" />
                            <h4>Add a job...</h4>
                        </button>
                    </div>
                    

                    {groupToJobsList && groupToJobsList.length > 0 && (
                        <>
                            <h3 className="filter-CTA">Filter By Groups</h3>
                            <ul className={`groupBar ${groupToJobsList.length > 5 ? 'groupBarScroll' : ''}`}>
                                <li className='groups'>
                                    <button 
                                        onClick={() => setSelectedGroupIndex(null)}    
                                        className={(selectedGroupIndex === null ? 'selectedGroup' : 'unselectedGroup')}
                                    >
                                        All Jobs
                                    </button>
                                </li>
                                {groupToJobsList.map(groupToJobEntry => (
                                    <li className='groups' key={groupToJobEntry.groupDto.group_id}>
                                        <button
                                            onClick={() => updateSelectedGroupIndex(groupToJobEntry.groupDto.group_id)}
                                            className={(selectedGroupIndex !== null &&
                                                groupToJobEntry.groupDto.group_id ===
                                                groupToJobsList[selectedGroupIndex].groupDto.group_id)
                                                ? 'selectedGroup'
                                                : 'unselectedGroup'}
                                        >
                                            {groupToJobEntry.groupDto.group_name}
                                       
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    
                    {groupToJobsList && selectedGroupIndex !== null && 
                      selectedGroupIndex < groupToJobsList.length && (
                        <JobList 
                            jobs={groupToJobsList[selectedGroupIndex].jobs} 
                            jobListTitle={groupToJobsList[selectedGroupIndex].groupDto.group_name} 
                            onItemClick={handleJobClick}
                        />
                    )}
                    {selectedGroupIndex === null &&
                        <JobList 
                            jobs={allJobs}
                            jobListTitle="All Jobs"
                            onItemClick={handleJobClick}
                        />
                    }
                    
                    {independentJobs && independentJobs.length > 0 && (
                        <>
                            <h3 className="ungrouped-jobs">Your ungrouped jobs</h3>
                            <JobList jobs={independentJobs} jobListTitle='Non-Grouped Jobs' onItemClick={handleJobClick} />
                        </>
                    )}

                    {/* This modal will pop up when they click a job  */}
                    {showingJobDetails && selectedJob && (
                        <JobDetailsModal job={selectedJob} onClose={closeModal} setErrorMessage={setErrorMessage} />
                    )}
                </>
            )}

            {creatingJob && (
                <>
                    {user && (
                        <CreateJobForm 
                            setCreatingJob={setCreatingJob} 
                            userId={user.user_id} 
                            independentJobs={independentJobs} 
                            setIndependentJobs={setIndependentJobs} 
                            setJobs={setJobs} 
                        />
                    )}
                </>
            )}

            {errorMessage !== "" && <ErrorMessage message={errorMessage} />}
        </div>
    );
}

export default JobsDashboard;