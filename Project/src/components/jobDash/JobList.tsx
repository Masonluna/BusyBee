import { JobDto } from '../../utils/types';
import '../../styles/jobsdashboard.css';

type JobListProps = {
    jobs: JobDto[];
    jobListTitle: string;
    onItemClick: (job: JobDto) => void;
}

const JobList: React.FC<JobListProps> = ({jobs, jobListTitle, onItemClick}) => {
    return (
        <div className="jobListContainer-component">
            <h2 className="job-list-title-component">{jobListTitle}</h2>
            {jobs && jobs.length > 0 && 
                <ul className='jobList-component'>
                    {jobs.map(job => (
                        <li key={job.job_id}
                            className='jobListing'
                            onClick={() => onItemClick(job)}
                        >
                            <div className='jobs-flex-display'>
                                <div className='left-info'>
                                    <span>{job.company_name}</span>
                                    <span>{job.job_title}</span>
                                </div>
                                <span>{job.status_name}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            }
            {jobs && jobs.length === 0 && (
                <div>
                    <h5>Uh-oh, it looks like you don't have any job applications yet... click "Add Job" to get started!</h5>
                </div>
            )

            }
        </div>
    );
}

export default JobList;