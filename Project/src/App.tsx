import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MainDashboard from './pages/MainDashboard';

const App = () => {
  

  return (
    <Routes>
      <Route path="*" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/dashboard" element={<MainDashboard />} />

    </Routes>
  )
}

export default App;



