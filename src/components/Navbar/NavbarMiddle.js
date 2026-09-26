import { Link } from "react-router-dom";
import "./NavbarMiddle.css";

function NavbarMiddle() {
    return (
        <div className="navbar-middle">
            <Link to="/" className="navbar-logo">
                VELZA
            </Link>
        </div>
    );
}

export default NavbarMiddle;