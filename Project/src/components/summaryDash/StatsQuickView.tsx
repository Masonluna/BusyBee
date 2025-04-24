import '../../styles/stats-quickview.css';
import { useDashboard } from '../../context/useDashboardContext';

const StatsQuickView: React.FC = () => {
    // Use the context to get stats
    const { stats } = useDashboard();

    return (
        <>
            <h3 className="stats-header">Your Stats</h3>

            <div className="stats-container">
                {stats && (
                    <>
                        <div className="stat-item total-apps">
                            <span className="stat-value">{stats.totalApps}</span>
                            <span className="stat-label-total">Total</span>
                        </div>

                        <div className="stat-item monthly-apps">
                            <span className="stat-value">{stats.appsThisMonth}</span>
                            <span className="stat-label">Applications This Month</span>
                        </div>

                        <div className="stat-item goal-apps">
                            <span className="stat-value">{stats.appsNeededForGoal}</span>
                            <span className="stat-label">Monthly Goal</span>
                        </div>
                        <div className="stat-item stat-empty">
                            <span className="stat-value">{stats.appsPerMonth.toFixed(2)}</span>
                            <span className="stat-label">Application Monthly Average</span>
                        </div>

                        <div className="stat-item stat-empty">
                            <span className="stat-value">{stats.interviewRate}</span>
                            <span className="stat-label">Interview Rate</span>
                        </div>

                        <div className="stat-item stat-empty">
                            <span className="stat-value">{stats.offerRate}</span>
                            <span className="stat-label">Offer Rate</span>
                        </div>
                    </>
                )}
                {!stats && (
                    <div>
                        <h5>Once you have job activity, you can reference your personal statistics here!</h5>
                    </div>
                )}
            </div>
        </>
    )
}

export default StatsQuickView;