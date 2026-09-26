import { Link } from "react-router-dom";
import "./AdminNav.css";

function AdminNav() {
    return (
        <nav className="admin-nav">

            <div className="admin-nav-title">
                VELZA ADMIN
            </div>

            <div className="admin-nav-links">

                <Link to="/admin/dashboard">
                    Dashboard
                </Link>

                <Link to="/admin/products">
                    Products
                </Link>

                <Link to="/admin/orders">
                    Orders
                </Link>

            </div>

        </nav>
    );
}

export default AdminNav;