import '../styles/easynavstyles.css';
import { SetStateAction } from 'react';



type EasyNavProps = {
    setSelectedDashboard: React.Dispatch<SetStateAction<string>>;
};


const EasyNav: React.FC<EasyNavProps> = ({ setSelectedDashboard }) => {

    return (
        <div className="navContainer">
            <nav>
                <ul className='linkList'>
                    <li className='listItem' onClick={() => setSelectedDashboard("summary")}>Summary</li>
                    <li className='listItem' onClick={() => setSelectedDashboard("jobs")}>Jobs</li>
                    <li className='listItem' onClick={() => setSelectedDashboard("stats")}>Stats</li>
                    <li className='listItem' onClick={() => setSelectedDashboard("groups")}>Groups</li>
                </ul>
            </nav>
        </div>
    )
}


export default EasyNav;