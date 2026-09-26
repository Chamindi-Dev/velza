import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./NavbarRight.css";

function NavbarRight() {

    const {
        cartItems,
        wishlistItems
    } = useCart();

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const wishlistCount = wishlistItems.length;

    return (
        <div className="navbar-right">

            <Link to="/search">
                Search
            </Link>

            <Link to="/orders">
                My Orders
            </Link>

            <Link to="/wishlist">
                Wishlist ({wishlistCount})
            </Link>

            <Link to="/cart">
                Cart ({cartCount})
            </Link>

        </div>
    );
}

export default NavbarRight;