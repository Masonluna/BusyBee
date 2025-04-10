import { Job, JobDto, Group, GroupJob, GroupToJobsDto } from '../utils/types';
import { getStatusMap } from './supabaseService';

async function fetchStatusMap(){
    const potentialStatusMap: {[key: number] : string} | null = await getStatusMap();
    if (!potentialStatusMap) {
        console.log('Error fetching statuses');
        return null;
    }
    const actualStatusMap: {[key: number] : string} = potentialStatusMap;
    return actualStatusMap;
}


export async function compileJobDtos(jobs: Job[]){
    const statusMap = await fetchStatusMap();
    if (!statusMap){
        console.log("Unable to compile Job Dtos because statusMap is null...");
        return null;
    }
    const jobDtos: JobDto[] = jobs.map(job => (
        {
            job_id: job.job_id,
            company_name: job.company_name,
            job_title: job.job_title,
            remote: job.remote,
            job_city: job.job_city,
            job_state: job.job_state,
            job_country: job.job_country,
            date_posted: job.date_posted,
            date_applied: job.date_applied,
            platform: job.platform,
            estimated_annual_salary: job.estimated_annual_salary,
            status_name: statusMap[job.status_id],
            notes: job.notes,
            user_id: job.user_id
        }
    ));
    return jobDtos;
}

export function compileGroupToJobsList(groups: Group[], jobs: JobDto[], groupJobs: GroupJob[]){
    let groupToJobsList: GroupToJobsDto[] = []
    for(let i = 0; i < groups.length; i++){
        let groupToJobsDto: GroupToJobsDto = {
            groupDto: {
                group_id: groups[i].group_id,
                group_name: groups[i].group_name
            },
            jobs: []
        }
        for (let j = 0; j < groupJobs.length; j++){
            for (let k = 0; k < jobs.length; k++){
                if (groups[i].group_id === groupJobs[j].group_id && groupJobs[j].job_id === jobs[k].job_id){
                    groupToJobsDto.jobs.push(jobs[k]);
                }
            }
        }
        groupToJobsList.push(groupToJobsDto);
    }
    return groupToJobsList;


}

export function compileIndependentJobs(jobs: JobDto[], groupJobs: GroupJob[]){
    let independentJobs: JobDto[] = []
    for(let i = 0; i < jobs.length; i++){
        let found = false;
        for(let j = 0; j < groupJobs.length; j++){
            if (jobs[i].job_id === groupJobs[j].job_id){
                found = true;
            }
        }
        if(!found){
            independentJobs.push(jobs[i]);
        }
    }
    return independentJobs;
}