import { Link } from 'react-router-dom';
import '../styles/easynavstyles.css';

const EasyNav = () => {


    return (
        <div className="navContainer">
            <nav>
                <ul className='linkList'>
                    <li className='listItem'><Link className='link' to="/jobs">Jobs</Link></li>
                    <li className='listItem'><Link className='link' to="/stats">Stats</Link></li>
                    <li className='listItem'><Link className='link' to="/docs">Docs</Link></li>
                    <li className='listItem'><Link className='link' to="/groups">Groups</Link></li>
                </ul>
            </nav>
        </div>
    )
}


export default EasyNav;