import '../styles/easynavstyles.css';

const EasyNav = () => {


    return (
        <div className="navContainer">
            <nav>
                <ul className='linkList'>
                    <li className='listItem'><a className='link'>Jobs</a></li>
                    <li className='listItem'><a className='link'>Groups</a></li>
                    <li className='listItem'><a className='link'>Docs</a></li>
                </ul>
            </nav>
        </div>
    )
}


export default EasyNav;