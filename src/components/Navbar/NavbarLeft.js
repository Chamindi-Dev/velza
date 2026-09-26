import { Link } from "react-router-dom";
import "./NavbarLeft.css";

function NavbarLeft() {
    return (
        <div className="navbar-left">
            <Link to="/women">Women</Link>
            <Link to="/new-in">New In</Link>
            <Link to="/collections">Collections</Link>
        </div>
    );
}

export default NavbarLeft;