import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {

    const { cartItems, setCartItems } = useCart();

    const safeCartItems = Array.isArray(cartItems)
        ? cartItems
        : [];


    // Calculate total price
    const totalPrice = safeCartItems.reduce(
        (total, item) =>
            total + Number(item.price) * Number(item.quantity),
        0
    );


    // Increase quantity
    const increaseQuantity = (index) => {

        const updatedCart = [...safeCartItems];

        updatedCart[index].quantity += 1;

        setCartItems(updatedCart);
    };


    // Decrease quantity
    const decreaseQuantity = (index) => {

        const updatedCart = [...safeCartItems];

        if (updatedCart[index].quantity > 1) {

            updatedCart[index].quantity -= 1;
        }

        setCartItems(updatedCart);
    };


    // Remove item
    const removeItem = (index) => {

        const updatedCart = safeCartItems.filter(
            (_, itemIndex) => itemIndex !== index
        );

        setCartItems(updatedCart);
    };


    return (
        <div className="cart-page">

            <NavBar />


            <section className="cart-container">

                <h1>
                    Your Cart
                </h1>


                {safeCartItems.length === 0 ? (

                    <p>
                        Your cart is empty.
                    </p>

                ) : (

                    <>

                        {/* Cart Items */}

                        <div className="cart-items">

                            {safeCartItems.map(
                                (item, index) => (

                                    <div
                                        className="cart-item"
                                        key={`${item.id}-${item.selectedSize}-${index}`}
                                    >

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                        />


                                        <div className="cart-item-info">

                                            <h3>
                                                {item.name}
                                            </h3>


                                            <p>
                                                Size:{" "}
                                                {item.selectedSize}
                                            </p>


                                            <p>
                                                Price: Rs.{" "}
                                                {Number(
                                                    item.price
                                                ).toLocaleString()}
                                            </p>


                                            {/* Quantity */}

                                            <div className="quantity-controls">

                                                <button
                                                    onClick={() =>
                                                        decreaseQuantity(index)
                                                    }
                                                >
                                                    −
                                                </button>


                                                <span>
                                                    {item.quantity}
                                                </span>


                                                <button
                                                    onClick={() =>
                                                        increaseQuantity(index)
                                                    }
                                                >
                                                    +
                                                </button>

                                            </div>


                                            {/* Remove */}

                                            <button
                                                className="remove-item"
                                                onClick={() =>
                                                    removeItem(index)
                                                }
                                            >
                                                REMOVE
                                            </button>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>


                        {/* Cart Summary */}

                        <div className="cart-summary">

                            <h2>
                                Total: Rs.{" "}
                                {totalPrice.toLocaleString()}
                            </h2>


                            <Link
                                to="/checkout"
                                className="checkout-button"
                            >
                                CHECKOUT
                            </Link>

                        </div>

                    </>

                )}

            </section>


            <Footer />

        </div>
    );
}

export default Cart;