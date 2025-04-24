import { JobDto, User, UserStats } from "../utils/types";

// Map is currently overkill here. It's only used for the apps filled out this month.
// However, once the stat page gets more functionality, having the map avaialable will be useful.
export function calculateUserStats(jobs: JobDto[], user: User) {
    // Relevant Statuses, "Interview", "Offer", "Rejected"
    let numInterviews = 0;
    let numRejections = 0;
    let numOffers = 0;
    let earliestYear = 2100;
    let earliestMonth = 13;
    function formatToPercent(num: number): string {
        const percent = Math.floor(num * 100);
        return percent.toString().slice(0, 2) + '%';
    }

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

                if (year < earliestYear) {
                    console.log(earliestYear);
                    earliestYear = year;
                }
                if (month < earliestMonth) {
                    earliestMonth = month;
                }
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

    const yearMap = initializeMap(jobs);
    const firstDate = new Date(earliestYear, earliestMonth);
    const now = new Date(Date.now());
    // Number of months = (current month - creation month) + (12 * (currentYear - creationYear))
    const numMonths = (now.getMonth() - firstDate.getMonth()) + (12 * (now.getFullYear() - firstDate.getFullYear()));

    // Tally stats
    // ==========
    const totalApps = jobs.length;
    const appsThisMonth = yearMap.get(now.getFullYear())?.at(now.getMonth()) || 0;
    const appsNeededForGoal = Math.max(user.monthly_goal - appsThisMonth, 0);

    // Percentage Stats
    // ==========
    const appsPerMonth = totalApps / numMonths;

    // Interviews-per-Application
    const interviewRate = formatToPercent(numInterviews / jobs.length);

    // Offer Rate
    const offerRate = formatToPercent(numOffers / jobs.length);

    // Interview success rate
    const intSuccessRate = formatToPercent(numOffers / numInterviews);

    const applicationStats: UserStats = {
        totalApps: totalApps,
        totalInterviews: numInterviews,
        totalOffers: numOffers,
        appsPerMonth: appsPerMonth,
        appsThisMonth: appsThisMonth,
        appsNeededForGoal: appsNeededForGoal,
        interviewRate: interviewRate,
        offerRate: offerRate,
        interviewSuccessRate: intSuccessRate
    };
    return applicationStats;
}