import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import { getProducts } from "../../services/productService";
import "./NewArrivals.css";

function NewArrivals() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts()
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error("Failed to load products:", error);
            });
    }, []);

    const newProducts = products.filter(
        (product) => product.badge === "NEW"
    );

    return (
        <section className="new-arrivals">

            <div className="new-arrivals-header">

                <p>JUST ARRIVED</p>

                <h2>
                    New Arrivals
                </h2>

                <p>
                    Discover the latest styles from VELZA.
                </p>

            </div>

            <div className="new-arrivals-list">

                {newProducts.slice(0, 4).map((product) => (

                    <ProductCard
                        key={product.id}
                        product={product}
                    />

                ))}

            </div>

            <div className="new-arrivals-button-wrapper">

                <Link
                    to="/new-in"
                    className="new-arrivals-button"
                >
                    VIEW ALL NEW IN
                </Link>

            </div>

        </section>
    );
}

export default NewArrivals;

