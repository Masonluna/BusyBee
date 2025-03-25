import type { Job, Group } from '../utils/types';


type JobsQuickViewProps = {
    jobs: Job[] | null;
    groups: Group[] | null;
    statusMap: {[key: number] : string}
}

const JobsQuickView: React.FC<JobsQuickViewProps> = ({ jobs, groups, statusMap }) => {

    for(let i = 1; i <= 6; i++){
        console.log(`from jobquickview, statusMap[${i}]=${statusMap[i]}`);
    }


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