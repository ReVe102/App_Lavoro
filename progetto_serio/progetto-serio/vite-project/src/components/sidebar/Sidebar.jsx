import "./sidebar.css"
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import BadgeIcon from '@mui/icons-material/Badge';

//togliere robe che non implementiamo
export default function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                    <Link to="/feedPrivati" className="sidebarLink">
                        <BadgeIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">Collaborators Area</span>
                    </Link>   
                    </li>
                    <li className="sidebarListItem">
                    <Link to="/feedAziende" className="sidebarLink">
                        <BusinessIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">Business Area</span>
                    </Link>   
                    </li>
                    <li className="sidebarListItem">
                        <ChatIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">Chat</span>
                    </li>
                    <Link to="/profilo" className="sidebarLink">
                    <li className="sidebarListItem">
                        <PersonIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">Profile</span>
                    </li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}