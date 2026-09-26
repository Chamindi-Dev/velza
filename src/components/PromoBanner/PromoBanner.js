import { Link } from "react-router-dom";
import "./PromoBanner.css";

function PromoBanner() {
    return (
        <section className="promo-banner">

            <img
                src={`${process.env.PUBLIC_URL}/images/promo-banner.jpg`}
                alt="VELZA Fashion Collection"
                className="promo-banner-image"
            />

            <div className="promo-banner-overlay">

                <div className="promo-banner-content">

                    <p>
                        VELZA EDIT
                    </p>

                    <h2>
                        Elevate Your Style
                    </h2>

                    <p>
                        Discover timeless pieces designed
                        for every occasion.
                    </p>

                    <Link
                        to="/women"
                        className="promo-banner-button"
                    >
                        SHOP NOW
                    </Link>

                </div>

            </div>

        </section>
    );
}

export default PromoBanner;