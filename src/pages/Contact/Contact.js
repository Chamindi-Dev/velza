import "./Contact.css";

function Contact() {
    return (
        <div className="contact-page">

            <h1>Contact Us</h1>

            <p className="contact-intro">
                We'd love to hear from you. Get in touch with us!
            </p>

            <form className="contact-form">

                <input
                    type="text"
                    placeholder="Your Name"
                />

                <input
                    type="email"
                    placeholder="Your Email"
                />

                <input
                    type="text"
                    placeholder="Subject"
                />

                <textarea
                    placeholder="Your Message"
                    rows="6"
                ></textarea>

                <button type="submit">
                    Send Message
                </button>

            </form>

        </div>
    );
}

export default Contact;