import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import { useCart } from "../../context/CartContext";
import { getOrders } from "../../services/productService";
import "./Orders.css";

function Orders() {

    const {
        cartItems,
        setCartItems
    } = useCart();


    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // GET ORDERS FROM ASP.NET API
    useEffect(() => {

        const loadOrders = async () => {

            try {

                const data =
                    await getOrders();

                setOrders(
                    Array.isArray(data)
                        ? data
                        : []
                );

            } catch (error) {

                console.error(
                    "Failed to load orders:",
                    error
                );

                setError(
                    "Failed to load orders."
                );

            } finally {

                setLoading(false);
            }
        };


        loadOrders();

    }, []);


    // BUY AGAIN
    const buyAgain = (item) => {

        const existingItem =
            cartItems.find(
                (cartItem) =>
                    cartItem.id === item.productId &&
                    cartItem.selectedSize ===
                        item.selectedSize
            );


        if (existingItem) {

            const updatedCart =
                cartItems.map(
                    (cartItem) =>
                        cartItem.id === item.productId &&
                        cartItem.selectedSize ===
                            item.selectedSize
                            ? {
                                  ...cartItem,
                                  quantity:
                                      cartItem.quantity +
                                      item.quantity
                              }
                            : cartItem
                );


            setCartItems(updatedCart);

        } else {

            const productForCart = {

                id:
                    item.productId,

                name:
                    item.productName,

                price:
                    item.price,

                image:
                    item.image,

                selectedSize:
                    item.selectedSize,

                quantity:
                    item.quantity

            };


            setCartItems([
                ...cartItems,
                productForCart
            ]);
        }


        alert(
            `${item.productName} added to cart!`
        );
    };


    // GET STATUS STEP
    const getStatusStep = (status) => {

        switch (status) {

            case "Pending":
                return 1;

            case "Processing":
                return 2;

            case "Shipped":
                return 3;

            case "Delivered":
                return 4;

            default:
                return 1;
        }
    };


    // LOADING
    if (loading) {

        return (
            <div className="orders-page">

                <NavBar />

                <section className="orders-container">

                    <h1>
                        My Orders
                    </h1>

                    <p>
                        Loading orders...
                    </p>

                </section>

                <Footer />

            </div>
        );
    }


    // ERROR
    if (error) {

        return (
            <div className="orders-page">

                <NavBar />

                <section className="orders-container">

                    <h1>
                        My Orders
                    </h1>

                    <p className="no-orders">
                        {error}
                    </p>

                </section>

                <Footer />

            </div>
        );
    }


    return (
        <div className="orders-page">

            <NavBar />


            <section className="orders-container">

                <h1>
                    My Orders
                </h1>


                {orders.length === 0 ? (

                    <p className="no-orders">
                        You haven't placed any orders yet.
                    </p>

                ) : (

                    <div className="orders-list">

                        {orders.map(
                            (order, orderIndex) => {

                                const currentStep =
                                    getStatusStep(
                                        order.status
                                    );


                                return (

                                    <div
                                        className="order-card"
                                        key={
                                            order.orderId ||
                                            order.id ||
                                            orderIndex
                                        }
                                    >

                                        {/* ORDER HEADER */}

                                        <div className="order-header">

                                            <div>

                                                <h2>
                                                    Order ID:{" "}
                                                    {
                                                        order.orderId ||
                                                        `Order #${
                                                            orderIndex + 1
                                                        }`
                                                    }
                                                </h2>

                                                <p>
                                                    Placed on:{" "}
                                                    {order.orderDate
                                                        ? new Date(
                                                              order.orderDate
                                                          ).toLocaleString()
                                                        : "Date not available"}
                                                </p>

                                            </div>


                                            <div className="order-status">

                                                {
                                                    order.status ||
                                                    "Pending"
                                                }

                                            </div>

                                        </div>


                                        {/* ORDER TRACKING */}

                                        <div className="order-tracking">

                                            <div className="tracking-line"></div>


                                            <div
                                                className={
                                                    currentStep >= 1
                                                        ? "tracking-step active"
                                                        : "tracking-step"
                                                }
                                            >

                                                <div className="tracking-circle">
                                                    1
                                                </div>

                                                <p>
                                                    Pending
                                                </p>

                                            </div>


                                            <div
                                                className={
                                                    currentStep >= 2
                                                        ? "tracking-step active"
                                                        : "tracking-step"
                                                }
                                            >

                                                <div className="tracking-circle">
                                                    2
                                                </div>

                                                <p>
                                                    Processing
                                                </p>

                                            </div>


                                            <div
                                                className={
                                                    currentStep >= 3
                                                        ? "tracking-step active"
                                                        : "tracking-step"
                                                }
                                            >

                                                <div className="tracking-circle">
                                                    3
                                                </div>

                                                <p>
                                                    Shipped
                                                </p>

                                            </div>


                                            <div
                                                className={
                                                    currentStep >= 4
                                                        ? "tracking-step active"
                                                        : "tracking-step"
                                                }
                                            >

                                                <div className="tracking-circle">
                                                    4
                                                </div>

                                                <p>
                                                    Delivered
                                                </p>

                                            </div>

                                        </div>


                                        {/* DELIVERY DETAILS */}

                                        <div className="order-customer">

                                            <h3>
                                                Delivery Details
                                            </h3>

                                            <p>
                                                {
                                                    order.customerName ||
                                                    "Name not available"
                                                }
                                            </p>

                                            <p>
                                                {
                                                    order.customerEmail ||
                                                    "Email not available"
                                                }
                                            </p>

                                            <p>
                                                {
                                                    order.customerPhone ||
                                                    "Phone not available"
                                                }
                                            </p>

                                            <p>
                                                {
                                                    order.customerAddress
                                                        ? `${order.customerAddress}, ${
                                                              order.customerCity ||
                                                              ""
                                                          }`
                                                        : "Address not available"
                                                }
                                            </p>

                                        </div>


                                        {/* PRODUCTS */}

                                        <div className="order-products">

                                            <h3>
                                                Products
                                            </h3>


                                            {Array.isArray(
                                                order.items
                                            ) &&

                                                order.items.map(
                                                    (
                                                        item,
                                                        itemIndex
                                                    ) => (

                                                        <div
                                                            className="order-product"
                                                            key={
                                                                item.id ||
                                                                itemIndex
                                                            }
                                                        >

                                                            <img
                                                                src={
                                                                    item.image
                                                                }
                                                                alt={
                                                                    item.productName
                                                                }
                                                            />


                                                            <div>

                                                                <h4>
                                                                    {
                                                                        item.productName
                                                                    }
                                                                </h4>


                                                                <p>
                                                                    Size:{" "}
                                                                    {
                                                                        item.selectedSize ||
                                                                        "Not selected"
                                                                    }
                                                                </p>


                                                                <p>
                                                                    Quantity:{" "}
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </p>


                                                                <p>
                                                                    Rs.{" "}
                                                                    {(
                                                                        Number(
                                                                            item.price
                                                                        ) *
                                                                        Number(
                                                                            item.quantity
                                                                        )
                                                                    ).toLocaleString()}
                                                                </p>


                                                                <button
                                                                    type="button"
                                                                    className="buy-again-button"
                                                                    onClick={() =>
                                                                        buyAgain(
                                                                            item
                                                                        )
                                                                    }
                                                                >
                                                                    BUY AGAIN
                                                                </button>

                                                            </div>

                                                        </div>
                                                    )
                                                )}

                                        </div>


                                        {/* PAYMENT */}

                                        <div className="order-payment">

                                            <p>
                                                Payment:{" "}

                                                {
                                                    order.paymentMethod ===
                                                    "cod"
                                                        ? "Cash on Delivery"
                                                        : "Card Payment"
                                                }

                                            </p>

                                        </div>


                                        {/* TOTAL */}

                                        <div className="order-total">

                                            <h3>
                                                Total: Rs.{" "}

                                                {Number(
                                                    order.total || 0
                                                ).toLocaleString()}

                                            </h3>

                                        </div>

                                    </div>
                                );
                            }
                        )}

                    </div>
                )}

            </section>


            <Footer />

        </div>
    );
}

export default Orders;