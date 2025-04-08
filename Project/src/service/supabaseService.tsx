import supabase from '../utils/supabase';
import {User, Job, Group, GroupJob} from '../utils/types';




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
            console.log('successful login: ', data);
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

export async function getGroupJobs(userId: string){
    try{
        const { data: groupJobsData, error: groupJobsError } = await supabase.from('group_jobs').select("*").eq("user_id", userId);
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

