import '../styles/static-pages.css'
import TeamInfo from '../components/staticPages/aboutTheTeamView';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import { User } from '../utils/types';

const TeamInformation: React.FC = () => {
    const location = useLocation();
    const user: User | null = location.state.user; 
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                {<Header user={user} />}
                <TeamInfo />
            </div>
            <Footer />
        </div>
    )
}

export default TeamInformation;