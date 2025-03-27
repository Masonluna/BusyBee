import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MainDashboard from './pages/MainDashboard';
import JobsDashboard from "./pages/JobsDashboard";
import StatsDashboard from "./pages/StatsDashboard";
import DocsDashboard from "./pages/DocsDashboard";
import GroupsDashboard from "./pages/GroupsDashboard";

const App = () => {
  

  return (
    <Routes>
      <Route path="*" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/dashboard" element={<MainDashboard />} />
      <Route path="/jobs" element={<JobsDashboard />} />
      <Route path="/stats" element={<StatsDashboard />} />
      <Route path="/docs" element={<DocsDashboard />} />
      <Route path="/groups" element={<GroupsDashboard />} />

    </Routes>
  )
}

export default App;



