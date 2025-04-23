import { Job, JobDto, JobInsertDto, Group, GroupJob, GroupToJobsDto, JobFormData } from '../utils/types';

export function compileJobInsertDto(jobData: JobFormData, userId: string){
    let statusId: number = 1;
        switch (jobData.statusInput){
            case 'Applied': 
                statusId = 1;
                break;
            case 'Assessment':
                statusId = 2;
                break;
            case 'Interview':
                statusId = 3;
                break;
            case 'Offer':
                statusId = 4;
                break;
            case 'Counter Offer':
                statusId = 5;
                break;
            case 'Rejected':
                statusId = 6;
                break;
            case 'No Response':
                statusId = 7;
                break;
            case 'Offer Accepted':
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

export function compileJobDtos(jobs: Job[]){
    const statusNames: string[] = new Array(jobs.length);
    for (let i = 0; i < jobs.length; i++){
        let statusName: string;
        switch (jobs[i].status_id){
            case 1:
                statusName = "Applied"
                break;
            case 2:
                statusName = "Assessment"
                break;
            case 3:
                statusName = "Interview"
                break;
            case 4:
                statusName = "Offer"
                break;
            case 5:
                statusName = "Counter Offer"
                break;
            case 6:
                statusName = "Rejected"
                break;
            case 7:
                statusName = "No Response"
                break;
            case 8:
                statusName = "Offer Accepted"
                break;
            default:
                statusName = ""
                break;
        }
        statusNames[i] = statusName;
    }
    
    const jobDtos: JobDto[] = jobs.map((job, index) => (
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
            status_name: statusNames[index],
            notes: job.notes,
            user_id: job.user_id
        }
    ));
    return jobDtos;
}

export function compileGroupToJobsList(groups: Group[], jobs: JobDto[], groupJobs: GroupJob[]){
    const groupToJobsList: GroupToJobsDto[] = []
    for(let i = 0; i < groups.length; i++){
        const groupToJobsDto: GroupToJobsDto = {
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

export function compileIndependentJobs(jobs: JobDto[], groupJobs: GroupJob[]): JobDto[] {
    const groupJobIds = new Set(groupJobs.map(groupJob => groupJob.job_id));
    return jobs.filter(job => !groupJobIds.has(job.job_id));
  }

export function createGroupToGroupJobsMap(groups: Group[], groupToJobsList: GroupToJobsDto[]): number[] {
    const resultMapping = new Array(groups.length);
    for (let i = 0; i < groups.length; i++) {
        for (let j = 0; j < groupToJobsList.length; j++) {
            if (groups[i].group_id === groupToJobsList[j].groupDto.group_id) {
                resultMapping[i] = groupToJobsList[j].groupDto.group_id;
                break;
            }
        }
    }
    
    // resultMapping is of the form [10, 13, ...], where the ith group in groups has the group_id at the ith position
    return resultMapping;
}

