import type { JobDto, UserStats } from "../../utils/types";
import JobsQuickView from "./JobsQuickView";
import StatsQuickView from "./StatsQuickView";


type SummaryDashboardProps = {
    jobs: JobDto[],
    stats: UserStats
}
const SummaryDashboard: React.FC<SummaryDashboardProps> = ({ jobs, stats }) => {


    return (
        <>
            <div>
                { jobs && jobs.length > 0 && <JobsQuickView jobs={jobs} /> }
                { stats && <StatsQuickView stats={stats} /> }
            </div>
        </>
    )
} 

export default SummaryDashboard;