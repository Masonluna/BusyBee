import { Link } from 'react-router-dom';
import '../styles/easynavstyles.css';
import { Group, Job } from '../utils/types';


type EasyNavProps = {
    jobs: Job[] | null;
    groups: Group[] | null;
};


const EasyNav: React.FC<EasyNavProps> = ({ jobs, groups }) => {


    return (
        <div className="navContainer">
            <nav>
                <ul className='linkList'>
                    <li className='listItem'><Link className='link' to="/jobs" state={{jobs}}>Jobs</Link></li>
                    <li className='listItem'><Link className='link' to="/stats">Stats</Link></li>
                    <li className='listItem'><Link className='link' to="/docs">Docs</Link></li>
                    <li className='listItem'><Link className='link' to="/groups" state={{groups}}>Groups</Link></li>
                </ul>
            </nav>
        </div>
    )
}


export default EasyNav;