import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProducts } from "../../services/productService";

import "./Collections.css";


function Collections() {

    const [searchParams] = useSearchParams();

    const selectedCollection = searchParams.get("collection");

    const productsSectionRef = useRef(null);

    const [products, setProducts] = useState([]);


    // Load products from API
    useEffect(() => {

        getProducts()
            .then((data) => {

                setProducts(data);

            })
            .catch((error) => {

                console.error(
                    "Failed to load products:",
                    error
                );

            });

    }, []);


    // Smoothly scroll to products when a collection is selected
    useEffect(() => {

        if (selectedCollection && productsSectionRef.current) {

            productsSectionRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }, [selectedCollection]);


    // Filter products according to selected collection
    const collectionProducts = products.filter(
        (product) =>
            product.collection === selectedCollection
    );


    // Collection names
    const collectionNames = {
        summer: "Summer Edit",
        evening: "Evening Edit",
        everyday: "Everyday Edit"
    };


    return (
        <div className="collections-page">

            <NavBar />


            {/* Page Header */}
            <section className="collections-header">

                <p>EXPLORE</p>

                <h1>Collections</h1>

                <p>
                    Discover our curated women's collections.
                </p>

            </section>


            {/* Collection Cards */}
            <section className="collection-list">


                {/* Summer Collection */}
                <div className="collection-card">

                    <img
                        src="/images/summer-collection.png"
                        alt="Summer Collection"
                    />

                    <h2>Summer Edit</h2>

                    <p>
                        Light and effortless styles.
                    </p>

                    <Link
                        to="/collections?collection=summer"
                        className="collection-button"
                    >
                        SHOP COLLECTION
                    </Link>

                </div>


                {/* Evening Collection */}
                <div className="collection-card">

                    <img
                        src="/images/evening-collection.png"
                        alt="Evening Collection"
                    />

                    <h2>Evening Edit</h2>

                    <p>
                        Elegant styles for every occasion.
                    </p>

                    <Link
                        to="/collections?collection=evening"
                        className="collection-button"
                    >
                        SHOP COLLECTION
                    </Link>

                </div>


                {/* Everyday Collection */}
                <div className="collection-card">

                    <img
                        src="/images/everyday-collection.png"
                        alt="Everyday Collection"
                    />

                    <h2>Everyday Edit</h2>

                    <p>
                        Simple styles for every day.
                    </p>

                    <Link
                        to="/collections?collection=everyday"
                        className="collection-button"
                    >
                        SHOP COLLECTION
                    </Link>

                </div>

            </section>


            {/* Selected Collection Products */}
            {selectedCollection && (

                <section
                    className="collection-products"
                    ref={productsSectionRef}
                >

                    <div className="collection-products-header">

                        <p>SHOP THE EDIT</p>

                        <h2>
                            {collectionNames[selectedCollection]}
                        </h2>

                    </div>


                    {collectionProducts.length > 0 ? (

                        <div className="collection-products-grid">

                            {collectionProducts.map((product) => (

                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />

                            ))}

                        </div>

                    ) : (

                        <div className="no-products">

                            <p>
                                No products available in this collection.
                            </p>

                        </div>

                    )}

                </section>

            )}


            <Footer />

        </div>
    );
}


export default Collections;