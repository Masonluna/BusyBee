import { Job, JobDto, JobInsertDto, Group, GroupJob, GroupToJobsDto, JobFormData } from '../utils/types';
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

export function compileJobInsertDto(jobData: JobFormData, userId: string){
    let statusId: number = 1;
        switch (jobData.statusInput){
            case 'applied': 
                statusId = 1;
                break;
            case 'assessment':
                statusId = 2;
                break;
            case 'interview':
                statusId = 3;
                break;
            case 'offer':
                statusId = 4;
                break;
            case 'counter offer':
                statusId = 5;
                break;
            case 'rejected':
                statusId = 6;
                break;
            case 'no response':
                statusId = 7;
                break;
            case 'offer accepted':
                statusId = 8;
                break;
        }
        let isRemote = false;
        switch (jobData.remoteInput){
            case 'remote':
                isRemote = true;
                break;
            case 'in person':
                isRemote = false;
                break;
        }
        const jobCity = jobData.jobCityInput !== "" ? jobData.jobCityInput : null;
        const jobState = jobData.jobStateInput !== "" ? jobData.jobStateInput : null;
        const jobCountry = jobData.jobCountryInput !== "" ? jobData.jobCountryInput : null;
        const datePosted = jobData.datePostedInput !== "" ? jobData.datePostedInput : null;
        const dateApplied = jobData.dateAppliedInput !== "" ? jobData.dateAppliedInput : null;
        const platform = jobData.platformInput !== "" ? jobData.platformInput : null;
        const estAnnualSalary = jobData.estimatedSalaryInput ? jobData.estimatedSalaryInput : null;
        const notes = jobData.notesInput ? jobData.notesInput : null;
        const jobInsertDto: JobInsertDto = {
            company_name: jobData.companyNameInput,
            job_title: jobData.jobTitleInput,
            remote: isRemote,
            job_city: jobCity,
            job_state: jobState,
            job_country: jobCountry,
            date_posted: datePosted,
            date_applied: dateApplied,
            platform: platform,
            estimated_annual_salary: estAnnualSalary,
            status_id: statusId,
            notes: notes,
            user_id: userId
        }
        return jobInsertDto;
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