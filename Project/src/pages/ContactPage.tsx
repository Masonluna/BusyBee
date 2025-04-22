import '../styles/static-pages.css'
import ContactUs from '../components/staticPages/contactView';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
    type User
} from '../utils/types';

type TeamInfoProps = {
    user: User | null;
   }

const TeamInformation: React.FC<TeamInfoProps> = ({user}) => {

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                {<Header user={user} />}
                <ContactUs />
            </div>
            <Footer />
        </div>
    )
}

export default TeamInformation;