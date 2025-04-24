import { SetStateAction, useState } from 'react';
import { Job, JobDto, JobFormData } from "../../utils/types";
import '../../styles/job-details-modal.css';
import { compileJobDtos } from '../../service/objectConversionService';
import { updateJob, deleteJob } from '../../service/supabaseService';
import { useDashboard } from '../../context/useDashboardContext';import '../../styles/button.css';


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
                        
                        <label className="job-labels-form" htmlFor="companyNameInput">Company Name</label>
                        <input type="text" name="companyNameInput" placeholder={job.company_name} onChange={handleInputChange} value={jobData.companyNameInput} />

                        <label className="job-labels-form" htmlFor="jobTitleInput">Job Title</label>
                        <input type="text" name="jobTitleInput" placeholder={job.job_title} onChange={handleInputChange} value={jobData.jobTitleInput} />

                        <label className="job-labels-form"  htmlFor="statusInput">Application Status</label>
                        <select
                            name="statusInput"
                            id="statusInput"
                            value={jobData.statusInput}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="Applied">Applied</option>
                            <option value="Assessment">Assessment</option>
                            <option value="Interview">Interview</option>
                            <option value="Offer">Offer</option>
                            <option value="Counter Offer">Counter Offer</option>
                            <option value="Rejected">Rejected</option>
                            <option value="No Response">No Response</option>
                            <option value="Offer Accepted">Offer Accepted</option>
                        </select>

                        <label className="job-labels-form" htmlFor="remoteInput">Remote</label>
                        <input type="text" name="remoteInput" placeholder={job.remote ? "Remote" : "In Person"} onChange={handleInputChange} value={jobData.remoteInput} />

                        <label className="job-labels-form" htmlFor="jobCityInput">Job City</label>
                        <input type="text" name="jobCityInput" placeholder={job.job_city ? job.job_city : "e.g. Dallas"} onChange={handleInputChange} value={jobData.jobCityInput} />

                        <label className="job-labels-form" htmlFor="jobStateInput">Job State</label>
                        <input type="text" name="jobStateInput" placeholder={job.job_state ? job.job_state : "e.g. Texas"} onChange={handleInputChange} value={jobData.jobStateInput} />

                        <label className="job-labels-form" htmlFor="jobCountryInput">Job Country</label>
                        <input type="text" name="jobCountryInput" placeholder={job.job_country ? job.job_country : "e.g. United States"} onChange={handleInputChange} value={jobData.jobCountryInput} />

                        <label className="job-labels-form" htmlFor="datePostedInput">Date Posted</label>
                        <input type="date" name="datePostedInput" onChange={handleInputChange} value={jobData.datePostedInput} />

                        <label className="job-labels-form" htmlFor="dateAppliedInput">Date Applied</label>
                        <input type="date" name="dateAppliedInput" onChange={handleInputChange} value={jobData.dateAppliedInput} />

                        <label className="job-labels-form" htmlFor="platformInput">Platform</label>
                        <input type="text" name="platformInput" value={jobData.platformInput} placeholder={job.platform ? job.platform : "e.g. LinkedIn, Indeed, etc..."} onChange={handleInputChange} />

                        <label className="job-labels-form" htmlFor="estimatedSalaryInput">Estimated Annual Salary</label>
                        <input type="text" name="estimatedSalaryInput" value={jobData.estimatedSalaryInput} placeholder={job.estimated_annual_salary ? `$${job.estimated_annual_salary}` : "No salary data"} onChange={handleInputChange} />

                        <label className="job-labels-form" htmlFor="notesInput">Notes</label>
                        <textarea
                            name="notesInput"
                            id="notes"
                            rows={5}
                            value={jobData.notesInput}
                            placeholder={job.notes ? job.notes : "Add notes about this job..."}
                            onChange={handleInputChange}
                        />

                        <div className='button-container'>
                            <button className="button" type='submit'>Submit Updates</button>
                            <button className="button"type='button' onClick={() => onClose()}>Cancel</button>
                            <button className="deleteButton" type='button' onClick={() => handleDelete()}>Delete Job</button>
                        </div>
                    </form>
                </div>
            </div>    
        </div>
    );
}

export default JobDetailsModal;