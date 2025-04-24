import { useDashboard } from "../../context/useDashboardContext";
import JobsQuickView from "./JobsQuickView";
import StatsQuickView from "./StatsQuickView";

const SummaryDashboard: React.FC = () => {
    // Use the context to get jobs and stats
    const { jobs, stats } = useDashboard();

    return (
        <>
            <div>
                { jobs && jobs.length > 0 && <JobsQuickView /> }
                { stats && <StatsQuickView /> }
            </div>
        </>
    )
} 

export default SummaryDashboard;