import '../styles/static-pages.css'
import ContactUs from '../components/staticPages/contactView';
//import Header from '../components/Header';
import Footer from '../components/Footer';



const TeamInformation: React.FC = () => {

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                
                <ContactUs />
            </div>
            <Footer />
        </div>
    )
}

export default TeamInformation;