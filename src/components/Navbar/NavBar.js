import NavbarLeft from "./NavbarLeft";
import NavbarMiddle from "./NavbarMiddle";
import NavbarRight from "./NavbarRight";
import "./NavBar.css";

function NavBar() {
    return (
        <nav className="navbar">
            <NavbarLeft />
            <NavbarMiddle />
            <NavbarRight />
        </nav>
    );
}

export default NavBar;