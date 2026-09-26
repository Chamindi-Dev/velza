import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar/NavBar";
import ProductCard from "../../components/ProductCard/ProductCard";
import Footer from "../../components/Footer/Footer";
import { getProducts } from "../../services/productService";
import "./NewIn.css";

function NewIn() {

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

    const newProducts = products.filter(
        (product) => product.badge === "NEW"
    );

    return (
        <div className="new-in-page">

            <NavBar />

            <section className="new-in-header">

                <p>JUST ARRIVED</p>

                <h1>New In</h1>

                <p>
                    Discover our latest women's styles.
                </p>

            </section>

            <section className="new-in-products">

                <div className="new-in-product-list">

                    {newProducts.map((product) => (

                        <ProductCard
                            key={product.id}
                            product={product}
                        />

                    ))}

                </div>

            </section>

            <Footer />

        </div>
    );
}

export default NewIn;