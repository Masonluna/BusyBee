import supabase from './supabase';
import {User, Job, Group} from './types';


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
    const { data: jobsData, error: jobsError } = await supabase.from('jobs').select('*').eq("user_id", userId);
    if (jobsError){
        console.log('Error getting users job data: ', jobsError.message);
        return null;
    }
    else if (jobsData){
        console.log('Got users job data')
        return jobsData as Job[];
    }
    else {
        return null;
    }
};

export async function getGroups(userId: string) {
    const { data: groupsData, error: groupsError} = await supabase.from('groups').select('*').eq("user_id", userId);
    if (groupsError){
        return null;
    }
    else if (groupsData){
        return groupsData as Group[];
    }
    else{
        return null;
    }
}