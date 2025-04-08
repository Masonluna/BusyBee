import type { Job, Group } from '../utils/types';


type JobsQuickViewProps = {
    jobs: Job[] | null;
    statusMap: {[key: number] : string}
}

const JobsQuickView: React.FC<JobsQuickViewProps> = ({ jobs, statusMap }) => {


    return (
        <>
        <h3>Your Jobs</h3>
            <ol>
                { jobs && jobs.map(job => (
                    <li key={job.job_id}>
                        {job.company_name}  {job.job_title}  ({statusMap[job.status_id]})
                    </li>
                ))}    
            </ol>  
         
        </>
    )
}

export default JobsQuickView;