export type User = {
    user_id: string,
    first_name: string,
    last_name: string,
    email: string,
    date_created: number,
    last_accessed: number,
    monthly_goal: number
}

export type Job = {
    job_id: number,
    company_name: string,
    job_title: string,
    remote: boolean,
    job_city: string,
    job_state: string,
    job_country: string,
    date_posted: string,    //yyyy-mm-dd
    date_applied: string,   //yyyy-mm-dd
    platform: string,
    estimated_annual_salary: number,
    status_id: number,
    notes: string,
    user_id: string
}
export type JobDto = {
    job_id: number,
    company_name: string,
    job_title: string,
    remote: boolean,
    job_city: string,
    job_state: string,
    job_country: string,
    date_posted: string,    //yyyy-mm-dd
    date_applied: string,   //yyyy-mm-dd
    platform: string,
    estimated_annual_salary: number,
    status_name: string, //status name is here, instead of the ID
    notes: string,
    user_id: string
}

export type Group = {
    group_id: number,
    group_name: string,
    group_start_date: string,
    group_end_datee: string,
    user_id: number
}
export type GroupDto = {
    group_id: number,
    group_name: string
}

export type Status = {
    status_id: number,
    status_name: string
}

export type GroupJob = {
    group_job_id: number,
    group_id: number,
    job_id: number
}


export type GroupToJobsDto = {
    groupDto: GroupDto,
    jobs: JobDto[]
}

export type UserStats = {
    totalApps: number,
    appsPerMonth: number,
    appsThisMonth: number,
    appsNeededForGoal: number
}