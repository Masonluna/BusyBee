import '../styles/header.css';
import type {User} from '../pages/HomePage';

type WelcomeMessageProps = {
    authUser: User;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({authUser}) => {

    return (
     <div className='header'>
        { (authUser.first_name!=="" && authUser.date_created === authUser.last_accessed) ? <h1>Welcome to Busybee {authUser.first_name}</h1> : <h1>Welcome back {authUser.first_name}</h1>}
     </div>
    ); 

}

export default WelcomeMessage;