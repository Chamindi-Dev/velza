import { createContext, useContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {

    // CART ITEMS
    const [cartItems, setCartItemsState] = useState(() => {

        const savedCart = localStorage.getItem("velzaCart");

        if (savedCart) {

            try {

                const parsedCart = JSON.parse(savedCart);

                if (Array.isArray(parsedCart)) {
                    return parsedCart;
                }

                return [];

            } catch (error) {

                console.log(
                    "Cart data error:",
                    error
                );

                return [];
            }
        }

        return [];
    });


    // WISHLIST ITEMS
    const [wishlistItems, setWishlistItemsState] = useState(() => {

        const savedWishlist =
            localStorage.getItem("velzaWishlist");

        if (savedWishlist) {

            try {

                const parsedWishlist =
                    JSON.parse(savedWishlist);

                if (Array.isArray(parsedWishlist)) {
                    return parsedWishlist;
                }

                return [];

            } catch (error) {

                console.log(
                    "Wishlist data error:",
                    error
                );

                return [];
            }
        }

        return [];
    });


    // UPDATE CART
    const setCartItems = (items) => {

        setCartItemsState(items);

        localStorage.setItem(
            "velzaCart",
            JSON.stringify(items)
        );
    };


    // UPDATE WISHLIST
    const setWishlistItems = (items) => {

        setWishlistItemsState(items);

        localStorage.setItem(
            "velzaWishlist",
            JSON.stringify(items)
        );
    };


    return (
        <CartContext.Provider
            value={{
                cartItems,
                setCartItems,

                wishlistItems,
                setWishlistItems
            }}
        >
            {children}
        </CartContext.Provider>
    );
}


export function useCart() {

    return useContext(CartContext);
}


export default CartProvider;