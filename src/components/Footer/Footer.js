import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {

    return (
        <footer className="footer">

            <div className="footer-main">

                {/* Brand */}
                <div className="footer-brand">

                    <Link
                        to="/"
                        className="footer-logo"
                    >
                        VELZA
                    </Link>

                    <p>
                        Modern fashion for every moment.
                    </p>

                    <p className="footer-description">
                        Discover timeless styles designed
                        for the modern woman.
                    </p>

                </div>


                {/* Shop */}
                <div className="footer-column">

                    <h3>
                        SHOP
                    </h3>

                    <Link to="/women">
                        Women
                    </Link>

                    <Link to="/new-in">
                        New In
                    </Link>

                    <Link to="/collections">
                        Collections
                    </Link>

                </div>


                {/* Customer Care */}
                <div className="footer-column">

                    <h3>
                        CUSTOMER CARE
                    </h3>

                    <Link to="/contact">
                        Contact Us
                    </Link>

                    <Link to="/shipping">
                        Shipping & Returns
                    </Link>

                    <Link to="/faq">
                        FAQ
                    </Link>

                </div>


                {/* Account */}
                <div className="footer-column">

                    <h3>
                        ACCOUNT
                    </h3>

                    <Link to="/orders">
                        My Orders
                    </Link>

                    <Link to="/wishlist">
                        Wishlist
                    </Link>

                    <Link to="/cart">
                        Cart
                    </Link>

                </div>

            </div>


            {/* Footer Bottom */}
            <div className="footer-bottom">

                <p>
                    © 2026 VELZA. All rights reserved.
                </p>

                <p>
                    Women's Fashion Store
                </p>

            </div>

        </footer>
    );
}

export default Footer;