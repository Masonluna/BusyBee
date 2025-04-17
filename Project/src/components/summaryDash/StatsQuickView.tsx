<<<<<<< HEAD:Project/src/components/StatsQuickView.tsx
import type { UserStats } from '../utils/types';
import '../styles/stats-quickview.css';
=======
import type { UserStats } from '../../utils/types';
>>>>>>> dc7140ed6d6d193c3d56867b422bd671e6931dc6:Project/src/components/summaryDash/StatsQuickView.tsx

type StatsQuickViewProps = {
    stats: UserStats | null;
}

const StatsQuickView: React.FC<StatsQuickViewProps> = ({ stats }) => {
    return (
        <>
            <h3>Your Stats</h3>
            {stats && (
                <div>
                    <p>Total Applications: {stats.totalApps}</p>
                    <p>Applications This Month: {stats.appsThisMonth}</p>
                    <p>Applications Left For Monthly Goal: {stats.appsNeededForGoal}</p>
                </div>
            )}
        </>
    )
}

export default StatsQuickView;