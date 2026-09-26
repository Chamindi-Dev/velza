import NavBar from "../../components/Navbar/NavBar";
import ProductCard from "../../components/ProductCard/ProductCard";
import Footer from "../../components/Footer/Footer";
import { useCart } from "../../context/CartContext";
import "./Wishlist.css";

function Wishlist() {

    const {
        wishlistItems,
        setWishlistItems
    } = useCart();

    const removeFromWishlist = (productId) => {

        const updatedWishlist = wishlistItems.filter(
            (item) => item.id !== productId
        );

        setWishlistItems(updatedWishlist);
    };

    return (
        <div className="wishlist-page">

            <NavBar />

            <section className="wishlist-container">

                <h1>My Wishlist</h1>

                {wishlistItems.length === 0 ? (

                    <p className="empty-wishlist">
                        Your wishlist is empty.
                    </p>

                ) : (

                    <div className="wishlist-product-list">

                        {wishlistItems.map((product) => (

                            <div
                                className="wishlist-item"
                                key={product.id}
                            >

                                <ProductCard
                                    product={product}
                                />

                                <button
                                    className="remove-wishlist"
                                    onClick={() =>
                                        removeFromWishlist(product.id)
                                    }
                                >
                                    REMOVE
                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </section>

            <Footer />

        </div>
    );
}

export default Wishlist;