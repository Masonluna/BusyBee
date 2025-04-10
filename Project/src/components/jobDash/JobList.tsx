import { JobDto } from "../utils/types";

type JobListProps = {
    jobs: JobDto[];
    jobListTitle: string;
}

const JobList: React.FC<JobListProps> = ({jobs, jobListTitle}) => {


    return <>
        <div className="jobListContainer">
            <h2>{jobListTitle}</h2>
            <ul className='jobList'>
                {jobs && jobs.map(job => (
                    <li key={job.job_id}
                        className='jobListing'
                    >
                        <p>{job.company_name}</p><p>{job.job_title}</p><p>{job.status_name}</p>
                    </li>
                ))}
            </ul>
        </div>
    </>
}

export default JobList;