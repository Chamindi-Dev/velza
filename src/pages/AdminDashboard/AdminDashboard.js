import { useState } from "react";
import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import AdminNav from "../../components/AdminNav/AdminNav";
import "./AdminDashboard.css";

function AdminDashboard() {

    const getOrders = () => {
        const savedOrders = localStorage.getItem("velzaOrders");

        if (!savedOrders) {
            return [];
        }

        try {
            const parsedOrders = JSON.parse(savedOrders);

            return Array.isArray(parsedOrders)
                ? parsedOrders
                : [];

        } catch (error) {
            console.log("Orders data error:", error);
            return [];
        }
    };

    const [orders] = useState(getOrders);

    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
        (order) => order.status === "Pending"
    ).length;

    const processingOrders = orders.filter(
        (order) => order.status === "Processing"
    ).length;

    const shippedOrders = orders.filter(
        (order) => order.status === "Shipped"
    ).length;

    const deliveredOrders = orders.filter(
        (order) => order.status === "Delivered"
    ).length;

    const totalSales = orders.reduce(
        (total, order) =>
            total + Number(order.total || 0),
        0
    );

    return (
        <div className="admin-dashboard-page">

            <NavBar />
            <AdminNav />

            <section className="admin-dashboard-container">

                <h1>
                    Admin Dashboard
                </h1>

                {/* Statistics */}

                <div className="dashboard-stats">

                    <div className="stat-card">
                        <h3>Total Orders</h3>
                        <p>{totalOrders}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Pending</h3>
                        <p>{pendingOrders}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Processing</h3>
                        <p>{processingOrders}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Shipped</h3>
                        <p>{shippedOrders}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Delivered</h3>
                        <p>{deliveredOrders}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Total Sales</h3>
                        <p>
                            Rs.{" "}
                            {totalSales.toLocaleString()}
                        </p>
                    </div>

                </div>

                {/* Recent Orders */}

                <div className="recent-orders">

                    <h2>
                        Recent Orders
                    </h2>

                    {orders.length === 0 ? (

                        <p className="no-dashboard-orders">
                            No orders available.
                        </p>

                    ) : (

                        <div className="recent-orders-list">

                            {orders
                                .slice()
                                .reverse()
                                .slice(0, 5)
                                .map((order, index) => (

                                    <div
                                        className="recent-order"
                                        key={
                                            order.orderId ||
                                            index
                                        }
                                    >

                                        <div>

                                            <h3>
                                                {order.orderId ||
                                                    `Order #${
                                                        index + 1
                                                    }`}
                                            </h3>

                                            <p>
                                                {order.customer?.name ||
                                                    "Customer"}
                                            </p>

                                        </div>

                                        <div className="recent-order-right">

                                            <span
                                                className="dashboard-status"
                                            >
                                                {order.status ||
                                                    "Pending"}
                                            </span>

                                            <p>
                                                Rs.{" "}
                                                {Number(
                                                    order.total || 0
                                                ).toLocaleString()}
                                            </p>

                                        </div>

                                    </div>

                                ))}

                        </div>

                    )}

                </div>

            </section>

            <Footer />

        </div>
    );
}

export default AdminDashboard;