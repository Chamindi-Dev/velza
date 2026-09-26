import { Link } from "react-router-dom";
import "./Categories.css";

function Categories() {
    return (
        <section className="categories">

            <div className="categories-header">
                <p>EXPLORE</p>
                <h2>Shop By Category</h2>
            </div>

            <div className="category-list">

                <div className="category-card">
                    <img
                        src="/images/dresses.png"
                        alt="Dresses"
                    />

                    <h3>Dresses</h3>

                    <Link to="/women" className="category-button">
                        SHOP NOW
                    </Link>
                </div>

                <div className="category-card">
                    <img
                        src="/images/tops.png"
                        alt="Tops"
                    />

                    <h3>Tops</h3>

                    <Link to="/women" className="category-button">
                        SHOP NOW
                    </Link>
                </div>

                <div className="category-card">
                    <img
                        src="/images/bottoms.png"
                        alt="Bottoms"
                    />

                    <h3>Bottoms</h3>

                    <Link to="/women" className="category-button">
                        SHOP NOW
                    </Link>
                </div>

            </div>

        </section>
    );
}

export default Categories;