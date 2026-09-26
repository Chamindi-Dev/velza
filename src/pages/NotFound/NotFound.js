import { Link } from "react-router-dom";
import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import "./NotFound.css";

function NotFound() {

    return (
        <div className="not-found-page">

            <NavBar />

            <section className="not-found-container">

                <p className="not-found-number">
                    404
                </p>

                <h1>
                    Page Not Found
                </h1>

                <p className="not-found-message">
                    Sorry, the page you're looking for
                    doesn't exist.
                </p>

                <Link
                    to="/"
                    className="back-home-button"
                >
                    BACK TO HOME
                </Link>

            </section>

            <Footer />

        </div>
    );
}

export default NotFound;