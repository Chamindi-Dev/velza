import { useEffect, useState } from "react";
import "./FeaturedProducts.css";
import ProductCard from "../ProductCard/ProductCard";
import { getProducts } from "../../services/productService";

function FeaturedProducts() {

    const [products, setProducts] = useState([]);

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


    // FEATURED PRODUCTS
    // DB IDs:
    // 2  = Tie-Up Blouse
    // 10 = Tie-Up Skirtshort

    const featuredProducts = products.filter(
        (product) =>
            product.id === 2 ||
            product.id === 10
    );


    return (
        <section className="featured-products">

            <div className="featured-header">

                <p>
                    OUR PICKS
                </p>

                <h2>
                    Featured Products
                </h2>

            </div>


            <div className="product-list">

                {featuredProducts.map(
                    (product) => (

                        <ProductCard
                            key={product.id}
                            product={product}
                        />

                    )
                )}

            </div>

        </section>
    );
}

export default FeaturedProducts;