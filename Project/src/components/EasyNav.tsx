import { Link } from 'react-router-dom';
import '../styles/easynavstyles.css';
import { Group, GroupToJobsDto, JobDto, UserStats } from '../utils/types';


type EasyNavProps = {
    groups: Group[] | null;
    independentJobs: JobDto[] | null;
    groupToJobsList: GroupToJobsDto[] | null;
    stats: UserStats | null;
};


const EasyNav: React.FC<EasyNavProps> = ({ groups, independentJobs, groupToJobsList, stats }) => {
    console.log(`groupToJobsList=${groupToJobsList}`);

    return (
        <div className="navContainer">
            <nav>
                <ul className='linkList'>
                    <li className='listItem'><Link className='link' to="/jobs" state={{independentJobs: independentJobs, groupToJobsList: groupToJobsList}}>Jobs</Link></li>
                    <li className='listItem'><Link className='link' to="/stats" state= {{stats: stats}}>Stats</Link></li>
                    <li className='listItem'><Link className='link' to="/docs">Docs</Link></li>
                    <li className='listItem'><Link className='link' to="/groups" state={{groups}}>Groups</Link></li>
                </ul>
            </nav>
        </div>
    )
}


export default EasyNav;