import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar/NavBar";
import ProductCard from "../../components/ProductCard/ProductCard";
import Footer from "../../components/Footer/Footer";
import { getProducts } from "../../services/productService";
import "./Women.css";

function Women() {

    const [products, setProducts] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("All");

    const [sortOption, setSortOption] = useState("featured");

    const categories = [
        "All",
        "Dresses",
        "Tops",
        "Bottoms"
    ];

    useEffect(() => {
        getProducts()
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error("Failed to load products:", error);
            });
    }, []);

    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter(
                  (product) =>
                      product.category === selectedCategory
              );

    const sortedProducts = [...filteredProducts].sort(
        (a, b) => {

            if (sortOption === "price-low") {
                return a.price - b.price;
            }

            if (sortOption === "price-high") {
                return b.price - a.price;
            }

            if (sortOption === "name-az") {
                return a.name.localeCompare(b.name);
            }

            return 0;
        }
    );

    return (
        <div className="women-page">

            <NavBar />

            <section className="women-header">

                <p>COLLECTION</p>

                <h1>Women</h1>

                <p>
                    Explore our women's collection.
                </p>

            </section>

            <section className="women-products">

                <div className="shop-controls">

                    <div className="category-filter">

                        {categories.map((category) => (

                            <button
                                key={category}
                                className={
                                    selectedCategory === category
                                        ? "active-category"
                                        : ""
                                }
                                onClick={() =>
                                    setSelectedCategory(category)
                                }
                            >
                                {category}
                            </button>

                        ))}

                    </div>

                    <div className="sort-box">

                        <label htmlFor="sort">
                            Sort by
                        </label>

                        <select
                            id="sort"
                            value={sortOption}
                            onChange={(event) =>
                                setSortOption(event.target.value)
                            }
                        >

                            <option value="featured">
                                Featured
                            </option>

                            <option value="price-low">
                                Price: Low to High
                            </option>

                            <option value="price-high">
                                Price: High to Low
                            </option>

                            <option value="name-az">
                                Name: A to Z
                            </option>

                        </select>

                    </div>

                </div>

                <div className="women-product-list">

                    {sortedProducts.map((product) => (

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

export default Women;

