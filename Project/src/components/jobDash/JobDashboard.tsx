import { useState, useEffect } from 'react';
import JobList from './JobList';
import CreateJobForm from './CreateJobForm';
import JobDetailsModal from './JobDetailsModal';
import '../../styles/jobsdashboard.css';
import plusSign from '../../assets/Busybee-plus-02.png';
import ErrorMessage from '../ErrorMessage';
import { useDashboard } from '../../context/useDashboardContext';
import { JobDto } from '../../utils/types';

const JobsDashboard: React.FC = () => {
    // Use the context instead of props
    const { 
        user,
        jobs,
        independentJobs,
        groupsToJobsList
    } = useDashboard();

    if (user) console.log(`user ${user.first_name}`);

    const [selectedGroupIndex, setSelectedGroupIndex] = useState<number | null>(null);
    const [creatingJob, setCreatingJob] = useState<boolean>(false);
    const [showingJobDetails, setShowingJobDetails] = useState<boolean>(false);
    const [selectedJob, setSelectedJob] = useState<JobDto | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    
    // Reset selectedGroupIndex when groupsToJobsList changes to prevent out of range issues
    useEffect(() => {
        setErrorMessage("");
        if (selectedGroupIndex !== null && 
            (groupsToJobsList === null || groupsToJobsList.length === 0 || 
             selectedGroupIndex >= groupsToJobsList.length)) {
            setSelectedGroupIndex(null);
        }
    }, [groupsToJobsList, selectedGroupIndex]);

    const updateSelectedGroupIndex = (groupId: number) => {
        setErrorMessage("");
        if (!groupsToJobsList) return;

        for (let i = 0; i < groupsToJobsList.length; i++){
            if (groupsToJobsList[i].groupDto.group_id === groupId){
                setSelectedGroupIndex(i);
                break;
            }
        }
    }

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
                        <button className="createButton" onClick={() => setCreatingJob(true)}>
                            <img src={plusSign} alt="yellow plus sign" className="plus-sign-size" />
                            <h4>Add a job...</h4>
                        </button>
                    </div>
                    
                    {groupsToJobsList && groupsToJobsList.length > 0 && (
                        <>
                            <h3 className="filter-CTA">Filter By Groups</h3>
                            <ul className={`groupBar ${groupsToJobsList.length > 5 ? 'groupBarScroll' : ''}`}>
                                <li className='groups'>
                                    <button 
                                        onClick={() => setSelectedGroupIndex(null)}    
                                        className={(selectedGroupIndex === null ? 'selectedGroup' : 'unselectedGroup')}
                                    >
                                        All Jobs
                                    </button>
                                </li>
                                {groupsToJobsList.map(groupToJobEntry => (
                                    <li className='groups' key={groupToJobEntry.groupDto.group_id}>
                                        <button
                                            onClick={() => updateSelectedGroupIndex(groupToJobEntry.groupDto.group_id)}
                                            className={(selectedGroupIndex !== null &&
                                                groupsToJobsList && // Added null check
                                                groupToJobEntry.groupDto.group_id ===
                                                groupsToJobsList[selectedGroupIndex].groupDto.group_id)
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
                    
                    {groupsToJobsList && selectedGroupIndex !== null && 
                      selectedGroupIndex < groupsToJobsList.length && (
                        <JobList 
                            jobs={groupsToJobsList[selectedGroupIndex].jobs} 
                            jobListTitle={groupsToJobsList[selectedGroupIndex].groupDto.group_name} 
                            onItemClick={handleJobClick}
                        />
                    )}
                    {selectedGroupIndex === null && jobs &&
                        <JobList 
                            jobs={jobs}
                            jobListTitle="All Jobs"
                            onItemClick={handleJobClick}
                        />
                    }
                    
                    {independentJobs && independentJobs.length > 0 && (
                        <>
                            <h3>Your ungrouped jobs</h3>
                            <JobList jobs={independentJobs} jobListTitle='Non-Grouped Jobs' onItemClick={handleJobClick} />
                        </>
                    )}

                    {showingJobDetails && selectedJob && (
                        <JobDetailsModal job={selectedJob} onClose={closeModal} setErrorMessage={setErrorMessage} />
                    )}
                </>
            )}

            {creatingJob && (
                <CreateJobForm setCreatingJob={setCreatingJob} setErrorMessage={setErrorMessage} />
            )}

            {errorMessage !== "" && <ErrorMessage message={errorMessage} />}
        </div>
    );
}

export default JobsDashboard;