import "./Shipping.css";

function Shipping() {
    return (
        <div className="shipping-page">

            <h1>Shipping & Returns</h1>

            <section className="shipping-section">
                <h2>Shipping Information</h2>
                <p>
                    We carefully prepare and pack every order before shipping.
                    Orders are processed within 2–3 business days.
                </p>
            </section>

            <section className="shipping-section">
                <h2>Delivery Time</h2>
                <p>
                    Once your order has been shipped, delivery usually takes
                    3–5 business days depending on your location.
                </p>
            </section>

            <section className="shipping-section">
                <h2>Returns</h2>
                <p>
                    If you are not satisfied with your purchase, you can request
                    a return within 14 days of receiving your order.
                </p>
            </section>

            <section className="shipping-section">
                <h2>Refunds</h2>
                <p>
                    Once your returned item is received and inspected, we will
                    process your refund according to our return policy.
                </p>
            </section>

        </div>
    );
}

export default Shipping;