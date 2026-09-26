import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar/NavBar";
import ProductCard from "../../components/ProductCard/ProductCard";
import Footer from "../../components/Footer/Footer";
import { getProducts } from "../../services/productService";
import "./Search.css";

function Search() {

    const [products, setProducts] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

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

    const filteredProducts = products.filter((product) => {

        const searchValue = searchTerm.toLowerCase();

        const productName = product.name.toLowerCase();
        const productCategory = product.category.toLowerCase();

        return (
            productName.includes(searchValue) ||
            productCategory.includes(searchValue)
        );
    });

    return (
        <div className="search-page">

            <NavBar />

            <section className="search-container">

                <h1>
                    Search
                </h1>

                <div className="search-box">

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(event.target.value)
                        }
                    />

                </div>

                {searchTerm &&
                filteredProducts.length === 0 ? (

                    <p className="no-search-results">
                        No products found.
                    </p>

                ) : (

                    <div className="search-product-list">

                        {filteredProducts.map(
                            (product) => (

                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />

                            )
                        )}

                    </div>

                )}

            </section>

            <Footer />

        </div>
    );
}

export default Search;