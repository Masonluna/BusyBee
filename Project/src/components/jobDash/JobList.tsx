import { JobDto } from  '../../utils/types';
import '../../styles/jobsdashboard.css'

type JobListProps = {
    jobs: JobDto[];
    jobListTitle: string;
}

const JobList: React.FC<JobListProps> = ({jobs, jobListTitle}) => {


    return <>
        <div className="jobListContainer">
            <h2 className="job-list-title">{jobListTitle}</h2>
            <ul className='jobList'>
                {jobs && jobs.map(job => (
                    <li key={job.job_id}
                        className='jobListing'
                    >
                        <div className='jobs-flex-display'>
                            <div className= 'left-info'>
                                <span>{job.company_name}</span>
                                <span>{job.job_title}</span>
                            </div>

                             <span>{job.status_name}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </>
}

export default JobList;