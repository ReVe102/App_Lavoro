import "./topbar.css"
import {Link} from "react-router-dom"

export default function TopbarComp(){
    return(
        <div className="topbarContainer" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
            <div className="topbarLeft"> 
            <Link to="/" style={{textDecoration:"none"}}>
            <span className="logo"> SOCIAL Business area</span>
            </Link>
            </div>
        </div>
    );
}
