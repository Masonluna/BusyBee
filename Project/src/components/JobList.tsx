import { Job } from "../utils/types";

type JobListProps = {
    jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({jobs}) => {


    return <>
        <div>
            <ul>
                {jobs && jobs.map(job => (
                    <li key={job.job_id}>
                        {job.company_name} - {job.}
                    </li>
                ))}
            </ul>
        </div>
    </>
}

export default JobList;