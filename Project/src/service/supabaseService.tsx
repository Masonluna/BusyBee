import supabase from '../utils/supabase';
import {User, Job, Group, GroupJob, JobInsertDto, JobDto, GroupInsertDto, GroupJobInsertDto, JobFormData} from '../utils/types';
import { compileJobDtos } from './objectConversionService';



export async function login(email: string, password: string){
    try{
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        if (error){
            console.log("Bad login: ", error.code);
            if (error.code === 'invalid_credentials'){
                console.log('Invalid login credentials.');
            }
            else{
                console.log('Error logging in');
            }
            return;
        }
        else if (data){
            console.log('successful login');
            console.log('fetching user from public.user');
            const user_id = data.user.id;
            const { data: userData, error: userError } = await supabase.from("users").select('*').eq('user_id', user_id);
            if (userError){
                console.log(`could not find ${data.user.email} in public.user...`);
                console.log('error: ', userError.code);
                return;
            }
            else if (userData){
                //update last_accessed
                console.log("found user from public.user");
                const new_last_accessed_timestamp = new Date().toISOString();
                const { error: updateError } = await supabase.from("users").update({ last_accessed: new_last_accessed_timestamp}).eq("user_id", user_id)
                if (updateError){
                    console.log("Error updating the last_accessed time for ", userData[0].email);
                }
                return userData[0];
            }
        }
    }
    catch(err) {
        console.log('Unexpected error sending login request... ', err);
    }
    return null;
}

export async function initiateResetPassword(email:string){
    try{
        const origin = window.location.origin;
        const redirectUrl = `${origin}/reset-password`
        const {data, error} = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: redirectUrl
        });
        if (error){
            console.log("Error initiating reset password flow: ", error);
            return false;
        }
        if (data){
            console.log("Successfully initiated reset password flow: ", data);
            return true;
        }
    }
    catch(err){
        console.log("Exception thrown in initiateResetPassword: ", err);
    }
    return false;
}

export async function resetPassword(newPassword: string){
    try{
        const {data, error} = await supabase.auth.updateUser({
            password: newPassword
        });
        if (error){
            console.log("Error resetting password: ", error);
            return false;
        }
        if (data){
            console.log("Password updated successfully");
            return true;
        }

    }
    catch(err){
        console.log("Exception thrown in resetPassword: ", err);
    }
    return false;
}


export async function getUserWithAuthenticationCheck() {
    const { data: authUser, error: authError } = await supabase.auth.getUser();
    if (authError) {
        console.log(`Error checking authentication: ${authError.code}`);
    }
    else if (authUser) {
        const { data: actualUserData, error: actualUserError } = await supabase.from('users').select('*').eq('user_id', authUser.user.id);
        if (actualUserError){
            console.log(`Error finding that user in public.Users. The user is authenticated though... This is an internal error.`);
            
        }
        else if(actualUserData && actualUserData.length > 0){
            console.log('Users authentication confirmed');
            return actualUserData[0] as User;
        }
        else{
            console.log('An unexpected error occurred while pulling the user from public.Users... this is an unexpected, internal error');            
        }
    }
    else{
        console.log('An unexpected error occurred while checking authentication.');
    }
    return null;
};

export async function getStatusMap() {
    const { data: statusData, error: statusError } = await supabase.from("status").select('*');
    if (statusError){
        console.log('Error: Could not pull status data: ', statusError.code);
    }
    else if(statusData){
        const statMap: {[key: number] : string} = {}
        for (let i = 0; i < statusData.length; i++){
            statMap[i+1] = statusData[i].status_name;
        }
        console.log('Returning status map');
        return statMap;
    }
    else{
        console.log('An unexpected error occurred while trying to pull status data');
    }
    return null;
};

export async function getJobs(userId: string) {
    try{
        const { data: jobsData, error: jobsError } = await supabase.from('jobs').select('*').eq("user_id", userId);
        if (jobsError){
            console.log('Error getting users job data: ', jobsError.message);
        }
        else if (jobsData){
            return jobsData as Job[];
        }
        else {
            console.log("Unexpected error while getting users jobs.");
        }
    }
    catch(err){
        console.log("Exception thrown while getting users job data: ", err);
    }
    return null;
};

export async function getGroups(userId: string) {
    try{
        const { data: groupsData, error: groupsError} = await supabase.from('groups').select('*').eq("user_id", userId);
        if (groupsError){
            console.log("Error getting users groups: ", groupsError);
        }
        else if (groupsData){
            return groupsData as Group[];
        }
        else{
            console.log("Unexpected error getting users groups.");
        }
    }
    catch(err){
        console.log("Exception thrown while getting users groups: ", err);
    }
    return null;
}

export async function getGroupJobsByGroupIds(groupIds: number[]){
    try{
        const { data: groupJobsData, error: groupJobsError } = await supabase.from('group_jobs').select("*").in("group_id", groupIds);
        if (groupJobsError){
            console.log("Error getting users group jobs data: ", groupJobsError);
        }
        else if (groupJobsData){
            return groupJobsData as GroupJob[];
        }
        else{
            console.log("Unexpected error getting users group jobs data.");
        }
    }
    catch(err){
        console.log("Exception thrown while getting users group jobs data: ", err);
    }
    return null;
}

export async function createJob(jobInsertDto: JobInsertDto) {
    try {
      const { data, error } = await supabase
        .from('jobs') 
        .insert([jobInsertDto])
        .select();
  
      if (error) {
        console.error("Error creating job:", error);
      }
  
      if (data && data.length > 0) {
        const job: Job = data[0] as Job;
        
        const jobDtos: JobDto[] = compileJobDtos([job]);
        if (jobDtos && jobDtos.length > 0){
            return jobDtos[0];
        }
      } 
    } catch (error) {
      console.error("An unexpected error occurred while creating the job:", error);
    }
    return null;
}


export async function createGroup(groupInsertDto: GroupInsertDto){
    try{
        const { data, error } = await supabase
            .from('groups')
            .insert([groupInsertDto])
            .select();

        if (error){
            console.error("Error creating group: ", error);
        }

        if (data && data.length > 0){
            const group: Group = data[0] as Group;
            return group;
        }
    }
    catch (err){
        console.log("Error creating group: ", err);
    }
    return null;
}

export async function deleteGroup(groupId: number){
    console.log("Attempting to delete group with id: ", groupId);
    
    try{
        //first delete all group_jobs where group_id === groupID
        const { error: groupJobError } = await supabase
            .from("group_jobs")
            .delete()
            .eq("group_id", groupId);
        if (groupJobError){
            console.log("Error deleting group jobs for group with id: ", groupId, ": ", groupJobError);
            return null;
        }


        const { error } = await supabase
            .from('groups')
            .delete()
            .eq('group_id', groupId);
        if (error){
            console.log("Error deleting group: ", error);
            return null;
        }
        console.log("Successfully deleted group");

    }
    catch(err){
        console.log("Error deleting group:", err);
    }
    return null;
}

// Add these functions to your supabaseService.ts file

export async function addJobToGroup(groupJobDto: GroupJobInsertDto): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('group_jobs')
        .insert([
          {
            group_id: groupJobDto.group_id,
            job_id: groupJobDto.job_id
          }
        ]);
  
      if (error) {
        console.error('Error adding job to group:', error);
        return false;
      }
      console.log('successfully added job to group: ', data);
  
      return true;
    } catch (err) {
      console.error('Exception adding job to group:', err);
      return false;
    }
}
  
export async function removeJobFromGroup(groupId: number, jobId: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('group_jobs')
        .delete()
        .match({ 
          group_id: groupId,
          job_id: jobId 
        });
  
      if (error) {
        console.error('Error removing job from group:', error);
        return false;
      }
  
      return true;
    } catch (err) {
      console.error('Exception removing job from group:', err);
      return false;
    }
}

export async function deleteJob(jobId: number): Promise<boolean> {
    try {
      // First, remove any group_jobs entries for this job
      const { error: groupJobsError } = await supabase
        .from('group_jobs')
        .delete()
        .eq('job_id', jobId);
      
      if (groupJobsError) {
        console.error('Error removing job from group_jobs:', groupJobsError);
        return false;
      }
      
      // Then delete the job itself
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('job_id', jobId);
      
      if (error) {
        console.error('Error deleting job:', error);
        return false;
      }
      
      return true;
    } catch (err) {
      console.error('Exception deleting job:', err);
      return false;
    }
}

export async function updateJob(jobData: JobFormData, jobId: number){
    try {
        // change the JobFormData into the shape expected by the database
        let statusId: number;
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
            default:
                statusId = 1;
                break;
        }
        const jobUpdate = {
            company_name: jobData.companyNameInput,
            job_title: jobData.jobTitleInput,
            remote: jobData.remoteInput === "Remote",
            job_city: jobData.jobCityInput,
            job_state: jobData.jobStateInput,
            job_country: jobData.jobCountryInput,
            date_posted: jobData.datePostedInput || null,
            date_applied: jobData.dateAppliedInput || null,
            platform: jobData.platformInput,
            estimated_annual_salary: jobData.estimatedSalaryInput || null,
            notes: jobData.notesInput,
            status_id: statusId
        };

        // Update the job and return the updated record
        const { data, error } = await supabase
            .from("jobs")
            .update(jobUpdate)
            .eq('job_id', jobId)
            .select();

        if (error){
            console.log("Error updating job with id: ", jobId, ": ", error);
            return null;
        }
        
        if (data){
            if (data.length === 0){
                console.log("Updated job but could not select it, data is empty");
                return null;
            }
            console.log("Success getting the job: ", data[0].company_name);
            return data[0] as Job;
        }
    }
    catch(err){
        console.log("Exception thrown from updateJob: ", err);
    }
    
    return null;
}



