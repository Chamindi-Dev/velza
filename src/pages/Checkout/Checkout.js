import { useState } from "react";
import { Link } from "react-router-dom";

import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";

import { useCart } from "../../context/CartContext";
import { createOrder } from "../../services/productService";

import "./Checkout.css";

function Checkout() {
    const { cartItems, setCartItems } = useCart();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: ""
    });

    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [placedOrderId, setPlacedOrderId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const safeCartItems = Array.isArray(cartItems)
        ? cartItems
        : [];

    const totalPrice = safeCartItems.reduce(
        (total, item) =>
            total +
            Number(item.price) * Number(item.quantity),
        0
    );

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlePlaceOrder = async (event) => {
        event.preventDefault();

        setError("");

        if (safeCartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.phone.trim() ||
            !formData.address.trim() ||
            !formData.city.trim()
        ) {
            alert("Please fill in all delivery details.");
            return;
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(formData.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        const phonePattern =
            /^[0-9+\-\s]{10,15}$/;

        if (!phonePattern.test(formData.phone)) {
            alert("Please enter a valid phone number.");
            return;
        }

        setLoading(true);

        try {
            const orderId = "VLZ-" + Date.now();

            const orderItems = safeCartItems.map((item) => ({
                productId: Number(item.id),
                productName: item.name,
                selectedSize: item.selectedSize || "",
                quantity: Number(item.quantity),
                price: Number(item.price),
                image: item.image
            }));

            const order = {
                orderId: orderId,
                status: "Pending",
                orderDate: new Date().toISOString(),
                customerName: formData.name.trim(),
                customerEmail: formData.email.trim(),
                customerPhone: formData.phone.trim(),
                customerAddress: formData.address.trim(),
                customerCity: formData.city.trim(),
                total: totalPrice,
                paymentMethod: paymentMethod,
                items: orderItems
            };

            console.log("Order being sent:", order);

            const savedOrder = await createOrder(order);

            console.log("Saved order:", savedOrder);

            setPlacedOrderId(
                savedOrder.orderId || orderId
            );

            setCartItems([]);

            setOrderPlaced(true);
        } catch (error) {
            console.error(
                "Order creation error:",
                error
            );

            console.error(
                "Error message:",
                error?.message ||
                JSON.stringify(error)
            );

            setError(
                error?.message ||
                "Failed to place your order."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-page">
            <NavBar />

            <section className="checkout-container">
                <h1>Checkout</h1>

                {orderPlaced ? (
                    <div className="order-success">
                        <h2>
                            Order Placed Successfully! 🎉
                        </h2>

                        <p>
                            Thank you for shopping with VELZA.
                        </p>

                        <p>
                            Your order has been received.
                        </p>

                        <p>
                            Order ID:
                            <strong>
                                {" "}
                                {placedOrderId}
                            </strong>
                        </p>

                        <div className="order-success-actions">
                            <Link
                                to="/orders"
                                className="view-orders-button"
                            >
                                VIEW MY ORDERS
                            </Link>

                            <Link
                                to="/women"
                                className="continue-shopping-button"
                            >
                                CONTINUE SHOPPING
                            </Link>
                        </div>
                    </div>
                ) : (
                    <form
                        className="checkout-content"
                        onSubmit={handlePlaceOrder}
                    >
                        {error && (
                            <p className="checkout-error">
                                {error}
                            </p>
                        )}

                        <div className="checkout-form">
                            <h2>Delivery Details</h2>

                            <div className="form-group">
                                <label>Full Name</label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            <div className="form-group">
                                <label>Address</label>

                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter your delivery address"
                                    rows="4"
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label>City</label>

                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Enter your city"
                                />
                            </div>
                        </div>

                        <div className="order-summary">
                            <h2>Order Summary</h2>

                            {safeCartItems.map((item) => (
                                <div
                                    className="summary-item"
                                    key={`${item.id}-${item.selectedSize}`}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                    />

                                    <div>
                                        <h3>{item.name}</h3>

                                        <p>
                                            Size:{" "}
                                            {item.selectedSize}
                                        </p>

                                        <p>
                                            Quantity:{" "}
                                            {item.quantity}
                                        </p>

                                        <p>
                                            Rs.{" "}
                                            {(
                                                Number(item.price) *
                                                Number(item.quantity)
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            <div className="summary-total">
                                <h3>
                                    Total: Rs.{" "}
                                    {totalPrice.toLocaleString()}
                                </h3>
                            </div>

                            <div className="payment-method">
                                <h3>Payment Method</h3>

                                <label>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="cod"
                                        checked={
                                            paymentMethod === "cod"
                                        }
                                        onChange={(event) =>
                                            setPaymentMethod(
                                                event.target.value
                                            )
                                        }
                                    />

                                    Cash on Delivery
                                </label>

                                <label>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="card"
                                        checked={
                                            paymentMethod === "card"
                                        }
                                        onChange={(event) =>
                                            setPaymentMethod(
                                                event.target.value
                                            )
                                        }
                                    />

                                    Card Payment
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="place-order-button"
                                disabled={loading}
                            >
                                {loading
                                    ? "PLACING ORDER..."
                                    : "PLACE ORDER"}
                            </button>
                        </div>
                    </form>
                )}
            </section>

            <Footer />
        </div>
    );
}

export default Checkout;
