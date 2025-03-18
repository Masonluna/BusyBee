import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


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


    return (
        <div>
            { (authUser.first_name!=="" && authUser.date_created === authUser.last_accessed) ? <h1>Welcome to Busybee {authUser.first_name}</h1> : <h1>Welcome back {authUser.first_name}</h1>}
        </div>
    )
}

export default HomePage;