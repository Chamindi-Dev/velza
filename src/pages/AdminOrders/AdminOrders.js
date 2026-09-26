import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import AdminNav from "../../components/AdminNav/AdminNav";
import "./AdminOrders.css";

function AdminOrders() {

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

    const [orders, setOrders] = useState(getOrders);

    // Change order status
    const updateStatus = (orderId, newStatus) => {

        const updatedOrders = orders.map((order) =>
            order.orderId === orderId
                ? {
                      ...order,
                      status: newStatus
                  }
                : order
        );

        setOrders(updatedOrders);

        localStorage.setItem(
            "velzaOrders",
            JSON.stringify(updatedOrders)
        );
    };

    return (
        <div className="admin-orders-page">

           <AdminNav />

            <section className="admin-orders-container">

                <h1>
                    Admin Orders
                </h1>

                {orders.length === 0 ? (

                    <p className="no-admin-orders">
                        No orders available.
                    </p>

                ) : (

                    <div className="admin-orders-list">

                        {orders
                            .slice()
                            .reverse()
                            .map((order, index) => (

                                <div
                                    className="admin-order-card"
                                    key={
                                        order.orderId ||
                                        index
                                    }
                                >

                                    {/* Order Header */}

                                    <div className="admin-order-header">

                                        <div>

                                            <h2>
                                                Order ID:{" "}
                                                {order.orderId ||
                                                    `Order #${
                                                        index + 1
                                                    }`}
                                            </h2>

                                            <p>
                                                Placed on:{" "}
                                                {order.orderDate
                                                    ? new Date(
                                                          order.orderDate
                                                      ).toLocaleString()
                                                    : "Date not available"}
                                            </p>

                                        </div>

                                        <div className="admin-status-section">

                                            <label>
                                                Order Status
                                            </label>

                                            <select
                                                value={
                                                    order.status ||
                                                    "Pending"
                                                }
                                                onChange={(event) =>
                                                    updateStatus(
                                                        order.orderId,
                                                        event.target.value
                                                    )
                                                }
                                            >

                                                <option value="Pending">
                                                    Pending
                                                </option>

                                                <option value="Processing">
                                                    Processing
                                                </option>

                                                <option value="Shipped">
                                                    Shipped
                                                </option>

                                                <option value="Delivered">
                                                    Delivered
                                                </option>

                                            </select>

                                        </div>

                                    </div>

                                    {/* Customer Details */}

                                    <div className="admin-customer">

                                        <h3>
                                            Customer Details
                                        </h3>

                                        <p>
                                            Name:{" "}
                                            {order.customer?.name ||
                                                "Not available"}
                                        </p>

                                        <p>
                                            Email:{" "}
                                            {order.customer?.email ||
                                                "Not available"}
                                        </p>

                                        <p>
                                            Phone:{" "}
                                            {order.customer?.phone ||
                                                "Not available"}
                                        </p>

                                        <p>
                                            Address:{" "}
                                            {order.customer?.address ||
                                                "Not available"}
                                            {order.customer?.city
                                                ? `, ${order.customer.city}`
                                                : ""}
                                        </p>

                                    </div>

                                    {/* Products */}

                                    <div className="admin-products">

                                        <h3>
                                            Products
                                        </h3>

                                        {Array.isArray(
                                            order.items
                                        ) &&
                                            order.items.map(
                                                (
                                                    item,
                                                    itemIndex
                                                ) => (

                                                    <div
                                                        className="admin-product"
                                                        key={
                                                            itemIndex
                                                        }
                                                    >

                                                        <img
                                                            src={
                                                                item.image
                                                            }
                                                            alt={
                                                                item.name
                                                            }
                                                        />

                                                        <div>

                                                            <h4>
                                                                {
                                                                    item.name
                                                                }
                                                            </h4>

                                                            <p>
                                                                Size:{" "}
                                                                {item.selectedSize ||
                                                                    "Not selected"}
                                                            </p>

                                                            <p>
                                                                Quantity:{" "}
                                                                {
                                                                    item.quantity
                                                                }
                                                            </p>

                                                            <p>
                                                                Price: Rs.{" "}
                                                                {(
                                                                    Number(
                                                                        item.price
                                                                    ) *
                                                                    Number(
                                                                        item.quantity
                                                                    )
                                                                ).toLocaleString()}
                                                            </p>

                                                        </div>

                                                    </div>

                                                )
                                            )}

                                    </div>

                                    {/* Payment */}

                                    <div className="admin-payment">

                                        <p>
                                            Payment:{" "}
                                            {order.paymentMethod ===
                                            "cod"
                                                ? "Cash on Delivery"
                                                : "Card Payment"}
                                        </p>

                                    </div>

                                    {/* Total */}

                                    <div className="admin-order-total">

                                        <h3>
                                            Total: Rs.{" "}
                                            {Number(
                                                order.total || 0
                                            ).toLocaleString()}
                                        </h3>

                                    </div>

                                </div>

                            ))}

                    </div>

                )}

            </section>

            <Footer />

        </div>
    );
}

export default AdminOrders;