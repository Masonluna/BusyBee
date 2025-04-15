import type { UserStats } from '../utils/types';

type StatsQuickViewProps = {
    stats: UserStats | null;
}

const StatsQuickView: React.FC<StatsQuickViewProps> = ({ stats }) => {
    return (
        <>
        <h3>Your Stats</h3>
            { stats && (
                <div>
                    <p>Total Applications: {stats.totalApps}</p>
                    <p>Applications Per Month: {stats.appsPerMonth}</p>
                    <p>Applications Left For Monthly Goal: {stats.appsNeededForGoal}</p>
                </div>
            )}
        </>
    )
}

export default StatsQuickView;