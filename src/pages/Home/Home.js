import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/Navbar/NavBar";
import Categories from "../../components/Categories/Categories";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Footer from "../../components/Footer/Footer";
import NewArrivals from "../../components/NewArrivals/NewArrivals";
import PromoBanner from "../../components/PromoBanner/PromoBanner";
import "./Home.css";

function Home() {
    return (
        <div>

            <NavBar />

            <section
                className="hero"
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero.jpg)`
                }}
            >

                <div className="hero-content">

                    <p>NEW </p>

                    <h1>Discover Your Style</h1>

                    <p>Modern fashion for every moment.</p>

                    <Link to="/women" className="hero-button">
                        SHOP NOW
                    </Link>

                </div>

            </section>

            <Categories />

            <FeaturedProducts />

            <NewArrivals />
            
            <PromoBanner />

            <Footer />

        </div>
    );
}

export default Home;