import { SetStateAction, useState } from 'react';
import { Job, JobDto, JobFormData } from "../../utils/types";
import '../../styles/job-details-modal.css';
import { compileJobDtos } from '../../service/objectConversionService';
import { updateJob, deleteJob } from '../../service/supabaseService';
import { useDashboard } from '../../context/useDashboardContext';

type JobDetailsModalProps = {
    job: JobDto,
    onClose: () => void;
    setErrorMessage: React.Dispatch<SetStateAction<string>>;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, onClose, setErrorMessage }) => {
    // Get state update functions from context
    const { 
        jobs,
        setJobs, 
        independentJobs,
        setIndependentJobs,
        groupJobs,
        setGroupJobs
    } = useDashboard();

    const [jobData, setJobData] = useState<JobFormData>({
        companyNameInput: job.company_name,
        jobTitleInput: job.job_title,
        remoteInput: job.remote ? "Remote" : "In Person",
        jobCityInput: job.job_city ? job.job_city : "",
        jobStateInput: job.job_state ? job.job_state : "",
        jobCountryInput: job.job_country ? job.job_country : "",
        datePostedInput: job.date_posted ? job.date_posted : "",
        dateAppliedInput: job.date_applied ? job.date_applied : "",
        platformInput: job.platform ? job.platform : "",
        estimatedSalaryInput: job.estimated_annual_salary ? job.estimated_annual_salary : undefined,
        notesInput: job.notes ? job.notes : "",
        statusInput: job.status_name,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setJobData(prevData => ({
            ...prevData,
            [name]: value
        }));
    } 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        
        const potentialUpdatedJob: Job | null = await updateJob(jobData, job.job_id);
        if(!potentialUpdatedJob){
            setErrorMessage("Error updating your job. Please try again");
            onClose();
            return;
        }

        const updatedJobArray: JobDto[] = compileJobDtos([potentialUpdatedJob]);
        const updatedJob: JobDto = updatedJobArray[0];
        
        // Update context state with updated job
        if (jobs) {
            setJobs(jobs.map(j => j.job_id === updatedJob.job_id ? updatedJob : j));
        }
        
        if (independentJobs) {
            const jobInIndependent = independentJobs.some(j => j.job_id === updatedJob.job_id);
            if (jobInIndependent) {
                setIndependentJobs(independentJobs.map(j => j.job_id === updatedJob.job_id ? updatedJob : j));
            }
        }
        
        onClose();
    }

    const handleDelete = async () => {
        const deletedSuccessfully: boolean = await deleteJob(job.job_id);
        if (!deletedSuccessfully) {
            setErrorMessage("Error deleting job. Please try again.");
            onClose();
            return;
        }
        
        console.log("Successfully deleted job with id: ", job.job_id);
        
        // Update context state after deletion
        if (jobs) {
            setJobs(jobs.filter(j => j.job_id !== job.job_id));
        }
        
        if (independentJobs) {
            setIndependentJobs(independentJobs.filter(j => j.job_id !== job.job_id));
        }
        
        if (groupJobs) {
            setGroupJobs(groupJobs.filter(gj => gj.job_id !== job.job_id));
        }
        
        onClose();
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Job Details</h2>

                <button className="modal-close" onClick={() => onClose()}>
                    &times;
                </button>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        
                        <label htmlFor="companyNameInput">Company Name</label>
                        <input type="text" name="companyNameInput" placeholder={job.company_name} onChange={handleInputChange} value={jobData.companyNameInput} />
                        
                        <div className='button-container'>
                            <button type='submit'>Submit Updates</button>
                            <button type='button' onClick={() => onClose()}>Cancel</button>
                            <button type='button' onClick={() => handleDelete()}>Delete Job</button>
                        </div>
                    </form>
                </div>
            </div>    
        </div>
    );
}

export default JobDetailsModal;