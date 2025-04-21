import { JobDto, User, UserStats } from "../utils/types";

// Map is currently overkill here. It's only used for the apps filled out this month.
// However, once the stat page gets more functionality, having the map avaialable will be useful.
export function calculateUserStats(jobs: JobDto[], user: User) {
    // Relevant Statuses, "Interview", "Offer", "Rejected"
    let numInterviews = 0;
    let numRejections = 0;
    let numOffers = 0;
    // Calculate the GCD according to Euclid's Algorithm
    var gcd = function (a: number, b: number): number {
        if (b == 0) {
            return a;
        }
        return gcd(b, a % b);
    };

    function initializeMap(jobs: JobDto[]): Map<number, number[]> {
        const yearMap: Map<number, number[]> = new Map();

        for (const job of jobs) {

            switch (job.status_name) {
                case "Offer":
                case "Counter Offer":
                case "Offer Accepted":
                    numOffers++;
                    numInterviews++;
                    break;
                case "Rejected":
                    numRejections++;
                    break;
                case "Interview":
                    numInterviews++;
                    break;
            }

            if (job.date_applied) {
                const year = parseInt(job.date_applied.substring(0, 4));
                const month = parseInt(job.date_applied.substring(5, 7)) - 1;
                if (!yearMap.has(year)) {
                    yearMap.set(year, new Array(12).fill(0));
                }

                yearMap.get(year)![month]++;
            }

        }
        console.log(`numInterviews: ${numInterviews}`);
        console.log(`numRejections: ${numRejections}`);
        console.log(`numOffers: ${numOffers}`);

        return yearMap;
    }

    const dateCreated = new Date(user.date_created);
    const now = new Date(Date.now());
    // Number of months = (current month - creation month) + (12 * (currentYear - creationYear))
    const numMonths = (now.getMonth() - dateCreated.getMonth()) + (12 * (now.getFullYear() - dateCreated.getFullYear()));

    const yearMap = initializeMap(jobs);

    // Tally stats
    // ==========
    const totalApps = jobs.length;
    const appsThisMonth = yearMap.get(now.getFullYear())?.at(now.getMonth()) || 0;
    const appsNeededForGoal = Math.max(user.monthly_goal - appsThisMonth, 0);

    // Ratio Stats
    // ==========
    const appsPerMonth = totalApps / numMonths;

    // Interviews-per-Application
    const intPerAppGCD = gcd(numInterviews, totalApps);
    const interviewsPerAppNum = numInterviews / intPerAppGCD;
    const interviewsPerAppDen = totalApps / intPerAppGCD;

    // Rejections-per-Application
    const rejPerAppGCD = gcd(numRejections, totalApps);
    const rejectionsPerAppNum = numRejections / rejPerAppGCD;
    const rejectionsPerAppDen = totalApps / rejPerAppGCD;

    // Offers-per-Interview
    const offPerIntGCD = gcd(numOffers, numInterviews);
    const offersPerInterviewNum = numOffers / offPerIntGCD;
    const offersPerInterviewDen = numInterviews / offPerIntGCD;


    const applicationStats: UserStats = {
        totalApps: totalApps,
        appsPerMonth: appsPerMonth,
        appsThisMonth: appsThisMonth,
        appsNeededForGoal: appsNeededForGoal,
        interviewsPerApp: [interviewsPerAppNum, interviewsPerAppDen],
        rejectionsPerApp: [rejectionsPerAppNum, rejectionsPerAppDen],
        offersPerInterview: [offersPerInterviewNum, offersPerInterviewDen]
    };
    return applicationStats;
}