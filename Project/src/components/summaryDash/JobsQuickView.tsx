import '../../styles/jobs-quickview.css';
import plusSign from '../../assets/Busybee-plus-02.png';
import { useState } from 'react';
import { useDashboard } from '../../context/useDashboardContext';
import CreateJobForm from '../jobDash/CreateJobForm';
import JobList from '../jobDash/JobList';
import { JobDto } from '../../utils/types';

const JobsQuickView: React.FC = () => {
    const { jobs, setErrorMessage } = useDashboard();
    const [creatingJob, setCreatingJob] = useState<boolean>(false);
    const [selectedJob, setSelectedJob] = useState<JobDto | null>(null);

    // Get the 3 most recent jobs (highest job_id values)
    const getRecentJobs = (): JobDto[] => {
        if (!jobs || jobs.length === 0) return [];
        
        // Sort jobs by job_id in descending order and take the first 3
        return [...jobs]
            .sort((a, b) => b.job_id - a.job_id)
            .slice(0, 3);
    };

    // Placeholder function for job clicks since we're not showing details in the summary
    const handleJobClick = (job: JobDto) => {
        setSelectedJob(job);
        // In the quick view, we might not want to show the details modal
        console.log("selected job=", selectedJob);
        // But we could navigate to the jobs dashboard or show a mini preview
        console.log("Job clicked in quick view:", job.job_id);
    };

    return (
        <>
            <div className="jobs-section">
                {!creatingJob && (
                    <>
                        <h3 className="jobs-header">Recent Jobs</h3>

                        <div className="add-job-CTA">
                            <div className="add-job-content" onClick={() => setCreatingJob(true)}>
                                <img src={plusSign} alt="yellow plus sign" className="plus-sign-size" />
                                <h4>Add a job...</h4>
                            </div>
                        </div>

                        {jobs && jobs.length > 0 && (
                            <JobList 
                                jobs={getRecentJobs()} 
                                jobListTitle="Recent Applications" 
                                onItemClick={handleJobClick} 
                            />
                        )}
                    </>
                )}
                
                {creatingJob && (
                    <CreateJobForm 
                        setCreatingJob={setCreatingJob} 
                        setErrorMessage={setErrorMessage} 
                    />
                )}
            </div>
        </>
    );
};

export default JobsQuickView;