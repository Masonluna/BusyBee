import '../styles/static-pages.css'
import TeamInfo from '../components/staticPages/aboutTheTeamView';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TeamInformation: React.FC = () => {

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                {<Header user={null} />}
                <TeamInfo />
            </div>
            <Footer />
        </div>
    )
}

export default TeamInformation;