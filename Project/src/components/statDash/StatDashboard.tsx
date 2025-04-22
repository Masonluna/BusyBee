import { User, UserStats } from '../../utils/types';
import '../../styles/statsdashboard.css';

type StatDashboardProps = {
    user: User,
    stats: UserStats
}
const StatDashboard: React.FC<StatDashboardProps> = ({ user, stats }) => {

    console.log('Stats: ', stats);

    return (
        

<>
  <div className="stats-page-container">
    <div className="top-container">
    <h1 className="stats-header-dash">Your Stats </h1>
    </div>
    <span className="welcome-message">{user && `Welcome to your personalized stats dashboard, ${user.first_name}`}</span>
    

    <div className="stats-grid">
      <div className="stat-box total-apps-box">
        <span className="stat-label total-apps-label">Total Applications</span>
        <span className="stat-value total-apps-value">{user && stats ? stats.totalApps : ''}</span>
      </div>
      
      <div className="stat-box monthly-apps-box">
        <span className="stat-label monthly-apps-label">Apps This Month</span>
        <span className="stat-value monthly-apps-value">{user && stats ? stats.appsThisMonth : ''}</span>
      </div>
      
      <div className="stat-box avg-monthly-apps-box">
        <span className="stat-label avg-monthly-apps-label">Avg Apps Per Month</span>
        <span className="stat-value avg-monthly-apps-value">{user && stats ? stats.appsPerMonth : ''}</span>
      </div>
      
      <div className="stat-box goal-remaining-box">
        <span className="stat-label goal-remaining-label">Goal Remaining</span>
        <span className="stat-value goal-remaining-value">{user && stats ? stats.appsNeededForGoal : ''}</span>
      </div>
      
      <div className="stat-box response-rate-box">
        <span className="stat-label response-rate-label">Response Rate</span>
        <span className="stat-value response-rate-value"></span>
      </div>
      
      <div className="stat-box interviews-box">
        <span className="stat-label interviews-label">Interviews</span>
        <span className="stat-value interviews-value"></span>
      </div>
      
      <div className="stat-box days-active-box">
        <span className="stat-label days-active-label">Days Active</span>
        <span className="stat-value days-active-value"></span>
      </div>
      
      <div className="stat-box longest-streak-box">
        <span className="stat-label longest-streak-label">Longest Streak</span>
        <span className="stat-value longest-streak-value"></span>
      </div>
      
      <div className="stat-box current-streak-box">
        <span className="stat-label current-streak-label">Current Streak</span>
        <span className="stat-value current-streak-value"></span>
      </div>
      
      <div className="stat-box offers-box">
        <span className="stat-label offers-label">Offers Received</span>
        <span className="stat-value offers-value"></span>
      </div>
    </div>
  </div>
</>
    )
}

export default StatDashboard;