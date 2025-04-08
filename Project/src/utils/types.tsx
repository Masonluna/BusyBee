export type User = {
    user_id: string,
    first_name: string,
    last_name: string,
    email: string,
    date_created: number,
    last_accessed: number
}

export type Job = {
    job_id: number,
    company_name: string,
    job_title: string,
    remote: boolean,
    job_city: string,
    job_state: string,
    job_country: string,
    date_posted: string,
    date_applied: string,
    platform: string,
    estimated_annual_salary: number,
    status_id: number,
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
    group_name: string,
    jobs: Job[]
}