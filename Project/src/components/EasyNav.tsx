import '../styles/easynavstyles.css';
import { SetStateAction } from 'react';



type EasyNavProps = {
    selectedDashboard: string,
    setSelectedDashboard: React.Dispatch<SetStateAction<string>>;
};


const EasyNav: React.FC<EasyNavProps> = ({ selectedDashboard, setSelectedDashboard }) => {

    return (
        <div className="navContainer">
            <nav>
                <ul className='linkList'>
                    <li className={selectedDashboard==='summary' ? 'listItemActive' : 'listItem'} onClick={() => setSelectedDashboard("summary")}>Summary</li>
                    <li className={selectedDashboard==='jobs' ? 'listItemActive' : 'listItem'} onClick={() => setSelectedDashboard("jobs")}>Jobs</li>
                    <li className={selectedDashboard==='stats' ? 'listItemActive' : 'listItem'} onClick={() => setSelectedDashboard("stats")}>Stats</li>
                    <li className={selectedDashboard==='groups' ? 'listItemActive' : 'listItem'} onClick={() => setSelectedDashboard("groups")}>Groups</li>
                </ul>
            </nav>
        </div>
    )
}


export default EasyNav;