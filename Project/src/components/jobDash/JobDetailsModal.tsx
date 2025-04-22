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
                <button className="modal-close" onClick={() => onClose()}>
                    &times;
                </button>
                <div className="modal-body">
                    <form>
                        <label htmlFor="companyName">Company Name</label>
                        <input type="text" name="companyName" placeholder={job.company_name}/>

                        <label htmlFor="jobTitle">Job Title</label>
                        <input type="text" name="jobTitle" placeholder={job.job_title} />
                    </form>
                </div>
            </div>    
        </div>
    )
}

export default JobDetailsModal;