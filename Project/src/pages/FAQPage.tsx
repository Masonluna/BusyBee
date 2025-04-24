import '../styles/static-pages.css'
import FAQ from '../components/staticPages/FAQView';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';

const TeamInformation: React.FC = () => {
    const location = useLocation();
    const user = location.state.user;
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Header user={user} />
                <FAQ />
            </div>

            <Footer />
        </div>
    )
}

export default TeamInformation;