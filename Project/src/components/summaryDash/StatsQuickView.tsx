import type { UserStats } from '../../utils/types';
import '../../styles/stats-quickview.css';

type StatsQuickViewProps = {
    stats: UserStats | null;
}

const StatsQuickView: React.FC<StatsQuickViewProps> = ({ stats }) => {
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
          <span className="stat-value"></span>
          <span className="stat-label"></span>
        </div>

        <div className="stat-item stat-empty">
          <span className="stat-value"></span>
          <span className="stat-label"></span>
        </div>

        <div className="stat-item stat-empty">
          <span className="stat-value"></span>
          <span className="stat-label"></span>
        </div>
          </>
        )}
      </div>
    </>
    )
}

export default StatsQuickView;