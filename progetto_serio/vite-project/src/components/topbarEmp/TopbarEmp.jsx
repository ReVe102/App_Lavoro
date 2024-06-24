import "./topbar.css"
import {Link} from "react-router-dom"

export default function TopbarEmp(){
    //inserire lo user autentcato login ecc
    return(
        <div className="topbarContainer">
            <div className="topbarLeft"> 
            <Link to="/" style={{textDecoration:"none"}}>
            <span className="logo"> SOCIAL Collaborators Area</span>
            </Link>
            </div>
        </div>
    );
}