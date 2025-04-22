import type { JobDto } from "../../utils/types";
import '../../styles/job-details-modal.css';


type JobDetailsModalProps = {
    job: JobDto,
    onClose: () => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, onClose }) => {

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Job Details</h2>

                <button className="modal-close" onClick={() => onClose()}>
                    &times;
                </button>
                <div className="modal-body">
                    <form>
                        <label htmlFor="companyName">Company Name</label>
                        <input type="text" name="companyName" placeholder={job.company_name}/>

                        <label htmlFor="jobTitle">Job Title</label>
                        <input type="text" name="jobTitle" placeholder={job.job_title} />

                        <label htmlFor="status">Application Status</label>
                        <select name="statusSelection" id="statusSelection">
                            
                        </select>

                        <label htmlFor="remote">Remote</label>
                        <input type="text" name="remote" placeholder={job.remote ? "Remote" : "In Person"} />

                        <label htmlFor="jobCity">Job City</label>
                        <input type="text" name="jobCity" placeholder={job.job_city ? job.job_city : "e.g. Dallas"} />

                        <label htmlFor="jobState">Job State</label>
                        <input type="text" name="jobState" placeholder={job.job_state ? job.job_state : "e.g. Texas"} />

                        <label htmlFor="jobCountry">Job Country</label>
                        <input type="text" name="jobCountry" placeholder={job.job_country ? job.job_country : "e.g. United States"} />

                        <label htmlFor="datePosted">Date Posted</label>
                        <input type="date" name="datePosted" />

                        <label htmlFor="dateApplied">Date Applied</label>
                        <input type="date" name="dateApplied" />

                        <label htmlFor="platform">Platform</label>
                        <input type="text" name="platform" placeholder={job.platform ? job.platform : "e.g. LinkedIn, Indeed, etc..."} />

                        <label htmlFor="estimatedSalary">Estimated Annual Salary</label>
                        <input type="text" name="estimatedSalary" placeholder={job.estimated_annual_salary ? `$${job.estimated_annual_salary}` : "No salary data"} />

                        <label htmlFor="notes">Notes</label>
                        <textarea
                            name="notes"
                            id="notes"
                            rows={5}
                            placeholder={job.notes ? job.notes : "Add notes about this job..."}
                        />


                    </form>
                </div>
            </div>    
        </div>
    )
}

export default JobDetailsModal;