import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MainDashboard from './pages/MainDashboard';
import AboutTeamPage from './pages/AboutTeamPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


const App = () => {
  

  return (
    <Routes>
      <Route path="*" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} /> 
      <Route path="/dashboard" element={<MainDashboard />} />
      <Route path="/about-team" element={<AboutTeamPage />}/>
      <Route path="/contact" element={<ContactPage />}/>
      <Route path="/FAQ" element={<FAQPage />}/>
    </Routes>
  )
}

export default App;



