import "./FAQ.css";

function FAQ() {
    return (
        <div className="faq-page">

            <h1>Frequently Asked Questions</h1>

            <div className="faq-list">

                <div className="faq-item">
                    <h2>How can I place an order?</h2>
                    <p>
                        Browse our products, select your favourite item,
                        choose the required size, and add it to your cart.
                        Then proceed to checkout to complete your order.
                    </p>
                </div>

                <div className="faq-item">
                    <h2>How long does delivery take?</h2>
                    <p>
                        Orders are usually delivered within 3–5 business days
                        after they have been shipped.
                    </p>
                </div>

                <div className="faq-item">
                    <h2>Can I return an item?</h2>
                    <p>
                        Yes. You can request a return within 14 days of
                        receiving your order, subject to our return policy.
                    </p>
                </div>

                <div className="faq-item">
                    <h2>How will I receive my refund?</h2>
                    <p>
                        Once your returned item has been received and inspected,
                        your refund will be processed according to our refund policy.
                    </p>
                </div>

                <div className="faq-item">
                    <h2>Can I cancel my order?</h2>
                    <p>
                        If your order has not been shipped yet, please contact
                        our customer care team as soon as possible.
                    </p>
                </div>

                <div className="faq-item">
                    <h2>How can I contact VELZA?</h2>
                    <p>
                        You can contact us through our Contact Us page and
                        send us your message.
                    </p>
                </div>

            </div>

        </div>
    );
}

export default FAQ;