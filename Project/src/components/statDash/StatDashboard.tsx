import { User, UserStats } from '../../utils/types';

type StatDashboardProps = {
    user: User,
    stats: UserStats
}
const StatDashboard: React.FC<StatDashboardProps> = ({ user, stats }) => {

    console.log('Stats: ', stats);

    return (
        <>
            <h1>Your Stats</h1>


            {/*Example of accessing user fields. Remove*/}
            {user && <h2>Welcome to your personalized stats dashboard, {user.first_name}</h2>}
            {user && stats && 
                <div>
                    <p>Total Applications Submitted: {stats.totalApps}</p>
                    <p>Number of applications submitted this month: {stats.appsThisMonth}</p>
                    <p>Average applications submitted per month: {stats.appsPerMonth}</p>
                    <p>Applications left to hit your monthly goal: {stats.appsNeededForGoal}</p>
                </div>
            }
        </>
    )
}

export default StatDashboard;