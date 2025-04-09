import { JobDto } from "../utils/types";

type JobListProps = {
    jobs: JobDto[];
}

const JobList: React.FC<JobListProps> = ({jobs}) => {


    return <>
        <div>
            <ul>
                {jobs && jobs.map(job => (
                    <li key={job.job_id}>
                        {job.company_name} - {job.status_name}
                    </li>
                ))}
            </ul>
        </div>
    </>
}

export default JobList;