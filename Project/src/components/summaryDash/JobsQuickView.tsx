import '../../styles/jobs-quickview.css';
import plusSign from '../../assets/Busybee-plus-02.png';
import type { JobDto } from '../../utils/types';
import {useState} from 'react';


type JobsQuickViewProps = {
    jobs: JobDto[] | null;
}

const JobsQuickView: React.FC<JobsQuickViewProps> = ({ jobs}) => {

const [setCreatingJob] = useState<boolean>(false);

    return (
        <>
            <div className="jobs-section">
                <h3 className="jobs-header">Your Jobs</h3>

                <div className="add-job-CTA">
                    <div className="add-job-content">
                        <img src={plusSign} alt="yellow plus sign" className="plus-sign-size" />
                        <h4>Add a job...</h4>
                    </div>
                </div>

                <div className="jobs-list-container">
                    <ol>
                        {jobs && jobs.map(job => (
                            <li key={job.job_id} className="jobs-list">
                            <div className="jobs-flex-display">
                              <div className="left-info">
                                <span>{job.company_name}</span>
                                <span>{job.job_title}</span>
                              </div>
                              <span className="status">{job.status_name}</span>
                            </div>
                          </li>
                        ))}
                    </ol>
                </div>
            </div> 
           
        </>
    )
}

export default JobsQuickView;