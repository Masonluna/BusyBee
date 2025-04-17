import { JobDto, User, UserStats } from "../utils/types";

// Map is currently overkill here. It's only used for the apps filled out this month.
// However, once the stat page gets more functionality, having the map avaialable will be useful.
export function calculateUserStats(jobs: JobDto[], user: User) {
    function initializeMap(jobs: JobDto[]): Map<number, number[]> {
        const yearMap: Map<number, number[]> = new Map();
        
        for (const job of jobs) {
            if (job.date_applied){
                const year = parseInt(job.date_applied.substring(0, 4));
                const month = parseInt(job.date_applied.substring(5, 7)) - 1;
                if (!yearMap.has(year)) {
                    yearMap.set(year, new Array(12).fill(0));
                }
                
                yearMap.get(year)![month]++;
            }
        }

        return yearMap;
    }
    
    const dateCreated = new Date(user.date_created);
    const now = new Date(Date.now());
    // Number of months = (current month - creation month) + (12 * (currentYear - creationYear))
    const numMonths = (now.getMonth() - dateCreated.getMonth()) + (12 * (now.getFullYear() - dateCreated.getFullYear()));
    
    const yearMap = initializeMap(jobs);
    
    const totalApps = jobs.length;
    const appsPerMonth = totalApps / numMonths;
    const appsThisMonth = yearMap.get(now.getFullYear())?.at(now.getMonth()) || 0;
    const appsNeededForGoal = Math.max(user.monthly_goal - appsThisMonth, 0);

    const applicationStats: UserStats = {
        totalApps: totalApps,
        appsPerMonth: appsPerMonth,
        appsThisMonth: appsThisMonth,
        appsNeededForGoal: appsNeededForGoal
    };
    return applicationStats;
}