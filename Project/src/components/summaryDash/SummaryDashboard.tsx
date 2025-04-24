import { useDashboard } from "../../context/useDashboardContext";
import JobsQuickView from "./JobsQuickView";
import StatsQuickView from "./StatsQuickView";

const SummaryDashboard: React.FC = () => {
    // Use the context to get jobs and stats
    const { jobs, stats } = useDashboard();
    console.log(`jobs=${jobs}, stats=${stats}`);
    return (
        <>
            <div>
                <JobsQuickView />
                <StatsQuickView />
            </div>
        </>
    )
} 

export default SummaryDashboard;