import type { JobDto } from '../utils/types';


type JobsQuickViewProps = {
    jobs: JobDto[] | null;
}

const JobsQuickView: React.FC<JobsQuickViewProps> = ({ jobs}) => {


    return (
        <>
        <h3>Your Jobs</h3>
            <ol>
                { jobs && jobs.map(job => (
                    <li key={job.job_id}>
                        {job.company_name}  {job.job_title}  ({job.status_name})
                    </li>
                ))}    
            </ol>  
         
        </>
    )
}

export default JobsQuickView;