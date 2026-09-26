import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./ProductCard.css";

function ProductCard({ product }) {

    const navigate = useNavigate();

    const {
        cartItems,
        wishlistItems,
        setWishlistItems
    } = useCart();

    if (!product) {
        return null;
    }

    const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

    const safeWishlistItems = Array.isArray(wishlistItems)
        ? wishlistItems
        : [];

    const isInWishlist = safeWishlistItems.some(
        (item) => item && item.id === product.id
    );

    const isInCart = safeCartItems.some(
        (item) => item && item.id === product.id
    );

    // Wishlist
    const handleWishlist = (event) => {

        event.preventDefault();
        event.stopPropagation();

        if (isInWishlist) {

            const updatedWishlist = safeWishlistItems.filter(
                (item) => item && item.id !== product.id
            );

            setWishlistItems(updatedWishlist);

        } else {

            setWishlistItems([
                ...safeWishlistItems,
                product
            ]);
        }
    };

    // Go to product details to select size
    const handleAddToCart = (event) => {

        event.preventDefault();
        event.stopPropagation();

        navigate(`/product/${product.id}`);
    };

    return (
        <div className="product-card">

            <div className="product-image-wrapper">

                <Link to={`/product/${product.id}`}>

                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                    />

                </Link>

                {product.badge && (
                    <span className="product-badge">
                        {product.badge}
                    </span>
                )}

                <button
                    className={`wishlist-heart ${
                        isInWishlist
                            ? "wishlist-active"
                            : ""
                    }`}
                    onClick={handleWishlist}
                    aria-label="Add to wishlist"
                >
                    {isInWishlist ? "♥" : "♡"}
                </button>

            </div>

            <Link
                to={`/product/${product.id}`}
                className="product-card-info"
            >

                <h3>
                    {product.name}
                </h3>

                <p>
                    {product.category}
                </p>

                <p>
                    Rs. {Number(product.price).toLocaleString()}
                </p>

            </Link>

            <button
                className="add-to-cart-button"
                onClick={handleAddToCart}
            >
                {isInCart
                    ? "View Product"
                    : "Add to Cart"}
            </button>

        </div>
    );
}

export default ProductCard;