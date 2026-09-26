import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import { useCart } from "../../context/CartContext";
import { getProductById } from "../../services/productService";
import "./ProductDetails.css";

function ProductDetails() {

    const { id } = useParams();

    const {
        cartItems,
        setCartItems,
        wishlistItems,
        setWishlistItems
    } = useCart();

    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // GET PRODUCT FROM ASP.NET API
    useEffect(() => {

        const loadProduct = async () => {

            try {

                const data = await getProductById(id);

                setProduct(data);

            } catch (error) {

                console.error(error);

                setError("Failed to load product.");

            } finally {

                setLoading(false);

            }
        };

        loadProduct();

    }, [id]);


    // SAFE CART AND WISHLIST ARRAYS
    const safeCartItems = Array.isArray(cartItems)
        ? cartItems
        : [];

    const safeWishlistItems = Array.isArray(wishlistItems)
        ? wishlistItems
        : [];


    // LOADING
    if (loading) {

        return (
            <div className="product-details-page">

                <NavBar />

                <section className="product-not-found">

                    <h1>
                        Loading...
                    </h1>

                </section>

                <Footer />

            </div>
        );
    }


    // ERROR
    if (error || !product) {

        return (
            <div className="product-details-page">

                <NavBar />

                <section className="product-not-found">

                    <h1>
                        Product Not Found
                    </h1>

                    <p>
                        Sorry, we couldn't find this product.
                    </p>

                    <Link to="/women">
                        BACK TO SHOP
                    </Link>

                </section>

                <Footer />

            </div>
        );
    }


    // CHECK WISHLIST
    const isInWishlist = safeWishlistItems.some(
        (item) =>
            item &&
            item.id === product.id
    );


    // ADD TO CART
    const handleAddToCart = () => {

        // SIZE IS REQUIRED
        if (!selectedSize) {

            alert("Please select a size.");

            return;
        }


        const existingItemIndex =
            safeCartItems.findIndex(
                (item) =>
                    item &&
                    item.id === product.id &&
                    item.selectedSize === selectedSize
            );


        // SAME PRODUCT + SAME SIZE
        if (existingItemIndex !== -1) {

            const updatedCart = [...safeCartItems];

            updatedCart[existingItemIndex] = {
                ...updatedCart[existingItemIndex],
                quantity:
                    updatedCart[existingItemIndex].quantity + 1
            };

            setCartItems(updatedCart);

        }

        // NEW PRODUCT OR DIFFERENT SIZE
        else {

            const newCartItem = {
                ...product,
                selectedSize: selectedSize,
                quantity: 1
            };

            setCartItems([
                ...safeCartItems,
                newCartItem
            ]);
        }

        alert("Added to Cart!");
    };


    // WISHLIST
    const handleWishlist = () => {

        if (isInWishlist) {

            const updatedWishlist =
                safeWishlistItems.filter(
                    (item) =>
                        item &&
                        item.id !== product.id
                );

            setWishlistItems(updatedWishlist);

        } else {

            setWishlistItems([
                ...safeWishlistItems,
                product
            ]);
        }
    };


    return (
        <div className="product-details-page">

            <NavBar />


            <section className="product-details-container">


                {/* IMAGE */}

                <div className="product-details-image">

                    <img
                        src={product.image}
                        alt={product.name}
                    />

                </div>


                {/* INFORMATION */}

                <div className="product-details-info">


                    {/* BADGE */}

                    {product.badge && (

                        <span className="product-details-badge">
                            {product.badge}
                        </span>

                    )}


                    {/* CATEGORY */}

                    <p className="product-details-category">
                        {product.category}
                    </p>


                    {/* NAME */}

                    <h1>
                        {product.name}
                    </h1>


                    {/* PRICE */}

                    <p className="product-details-price">
                        Rs.{" "}
                        {Number(
                            product.price
                        ).toLocaleString()}
                    </p>


                    {/* DESCRIPTION */}

                    <p className="product-details-description">
                        {product.description}
                    </p>


                    {/* SIZE */}

                    <div className="product-size-section">

                        <h3>
                            Select Size
                        </h3>


                        <div className="size-options">

                            {(product.sizes || []).map(
                                (size) => (

                                    <button
                                        key={size.id}
                                        type="button"
                                        className={
                                            selectedSize === size.size
                                                ? "selected-size"
                                                : ""
                                        }
                                        onClick={() =>
                                            setSelectedSize(size.size)
                                        }
                                    >
                                        {size.size}
                                    </button>

                                )
                            )}

                        </div>

                    </div>


                    {/* ADD TO CART */}

                    <button
                        type="button"
                        className="add-to-cart-button"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>


                    {/* WISHLIST */}

                    <button
                        type="button"
                        className={`wishlist-button ${
                            isInWishlist
                                ? "wishlist-active"
                                : ""
                        }`}
                        onClick={handleWishlist}
                    >

                        {isInWishlist
                            ? "♥ Remove from Wishlist"
                            : "♡ Add to Wishlist"
                        }

                    </button>

                </div>

            </section>


            <Footer />

        </div>
    );
}

export default ProductDetails;