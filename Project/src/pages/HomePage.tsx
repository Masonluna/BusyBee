import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EasyNav from '../components/EasyNav';
import Footer from '../components/Footer';
import WelcomeMessage from '../components/WelcomeMessage';


export type User = {
    first_name: string,
    last_name: string,
    email: string,
    date_created: number,
    last_accessed: number
}



const HomePage: React.FC = () => {
    const [authUser, setAuthUser] = useState<User>({first_name: "", last_name: "", email: "", date_created: Date.now(), last_accessed: Date.now()});
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        if (!location.state){
            localStorage.clear();
            navigate('/login');
        }
        else{
            setAuthUser(location.state.loggedUser);
        }
        
    }, [navigate, location]);

    //only one return element (div)
    return (
        <div>
            <WelcomeMessage authUser={authUser} /> 
            <EasyNav />
            <Footer></Footer>
        </div>
    )
}

export default HomePage;