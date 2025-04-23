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
    job_city: string | null,
    job_state: string | null,
    job_country: string | null,
    date_posted: string | null,
    date_applied: string | null,
    platform: string | null,
    estimated_annual_salary: number | null,
    status_id: number,
    notes: string | null,
    user_id: string
}

export type JobFormData = {
    companyNameInput: string;
    jobTitleInput: string;
    remoteInput: string;
    jobCityInput: string;
    jobStateInput: string;
    jobCountryInput: string;
    datePostedInput: string;
    dateAppliedInput: string;
    platformInput: string;
    estimatedSalaryInput: number | undefined;
    notesInput: string;
    statusInput: string;
};

export type JobInsertDto = {
    company_name: string,
    job_title: string,
    remote: boolean,
    job_city: string | null,
    job_state: string | null,
    job_country: string | null,
    date_posted: string | null,
    date_applied: string | null,
    platform: string | null,
    estimated_annual_salary: number | null,
    status_id: number,
    notes: string | null,
    user_id: string
}
export type JobDto = {
    job_id: number,
    company_name: string,
    job_title: string,
    remote: boolean,
    job_city: string | null,
    job_state: string | null,
    job_country: string | null,
    date_posted: string | null,
    date_applied: string | null,
    platform: string | null,
    estimated_annual_salary: number | null,
    status_name: string, //status name is here, instead of the ID
    notes: string | null,
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
export type GroupInsertDto = {
    group_name: string,
    user_id: string
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
export type GroupJobInsertDto = {
    group_id: number,
    job_id: number
}


export type GroupToJobsDto = {
    groupDto: GroupDto,
    jobs: JobDto[]
}

export type UserStats = {
    totalApps: number,
    totalInterviews: number,
    totalOffers: number,
    appsPerMonth: number,
    appsThisMonth: number,
    appsNeededForGoal: number,
    interviewRate: string,
    offerRate: string,
    interviewSuccessRate: string,
}