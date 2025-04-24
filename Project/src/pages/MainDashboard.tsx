import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EasyNav from '../components/EasyNav';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ErrorMessage from '../components/ErrorMessage';
import JobsDashboard from '../components/jobDash/JobDashboard';
import DashboardLabel from '../components/DashboardLabel';
import SummaryDashboard from '../components/summaryDash/SummaryDashboard';
import StatDashboard from '../components/statDash/StatDashboard';
import GroupDashboard from '../components/groupDash/GroupDashboard';
import { useDashboard } from '../context/useDashboardContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  // Get all necessary state from context
  const {
    user,
    jobs,
    groups,
    independentJobs,
    groupsToJobsList,
    stats,
    hasLoaded,
    errorMessage,
    selectedDashboard,
    setSelectedDashboard
  } = useDashboard();

  // runs onMount: checks authentication (if needed)
  // Note: This might be redundant with DashboardDataProvider, but keeping it for safety
  useEffect(() => {
    if (!user && hasLoaded) {
      console.log('Could not verify authentication on HomePage, navigating to login');
      navigate('/');
    }
  }, [user, hasLoaded, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {errorMessage !== "" && <ErrorMessage message={errorMessage} />}

        {user && <Header user={user} />}
        <DashboardLabel />

        <div className="main-container" style={{paddingBottom: '80px'}}>
          <EasyNav selectedDashboard={selectedDashboard} setSelectedDashboard={setSelectedDashboard} />

          <div className="dashboard-container">
            {selectedDashboard === 'summary' && jobs && stats &&
              <SummaryDashboard />}

            {selectedDashboard === 'jobs' && user && independentJobs && groupsToJobsList && jobs &&
              <JobsDashboard />}

            {selectedDashboard === 'stats' && user && stats &&
              <StatDashboard />}

            {selectedDashboard === 'groups' && user && groups && groupsToJobsList && jobs &&
              <GroupDashboard />}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;