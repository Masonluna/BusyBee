import '../styles/profilemenu.css'
import { useEffect, useRef, useState } from "react";
import profile from '../assets/PFP-icon.png';


type ProfileMenuProps = {
    onLogout: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ onLogout }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const aRef = useRef<HTMLAnchorElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dialogRef.current &&
                !dialogRef.current.contains(event.target as Node) &&
                !aRef.current?.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        const handleEscapePress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapePress);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapePress);
        }
    }, []);


    return (
        <div className="profile-menu-container">
            <a
                ref={aRef}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <img src={profile} alt='profile picture icon' className="profile"></img>
            </a>

            {isOpen && (
                <div
                    ref={dialogRef}
                    className="profile-dialog"
                >
                    <button onClick={() => {
                        setIsOpen(false);
                        onLogout();
                    }} className="menu-item logout">
                        Log Out
                    </button>

                </div>
            )}
        </div>
    );
};

export default ProfileMenu;