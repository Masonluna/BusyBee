import type { Job, Group } from '../utils/types';
import '../styles/jobs-quickview.css';
import plusSign from '../assets/Busybee-plus-02.png';

type JobsQuickViewProps = {
    jobs: Job[] | null;
    groups: Group[] | null;
    statusMap: {[key: number] : string}
}

const JobsQuickView: React.FC<JobsQuickViewProps> = ({ jobs, groups, statusMap }) => {


    return (
        <>
            <div className="jobs-section">
                <h3>Your Jobs</h3>

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
                                {job.company_name} {job.job_title} ({statusMap[job.status_id]})
                            </li>
                        ))}
                    </ol>
                </div>
            </div> 
            
            {/*This second list is temporary, groups should be incorporated in the job list*/}
        <h3>Your Groups</h3>
            <ol>
                { groups && groups.map(group => (
                    <li key={group.group_id}>
                        {group.group_name}
                    </li>
                ))}
            </ol>  
        </>
    )
}

export default JobsQuickView;