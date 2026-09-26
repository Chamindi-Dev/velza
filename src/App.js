import { BrowserRouter, Routes, Route } from "react-router-dom";

import CartProvider from "./context/CartContext";

import Home from "./pages/Home/Home";
import Women from "./pages/Women/Women";
import NewIn from "./pages/NewIn/NewIn";
import Collections from "./pages/Collections/Collections";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import Wishlist from "./pages/Wishlist/Wishlist";
import Search from "./pages/Search/Search";
import NotFound from "./pages/NotFound/NotFound";
import Contact from "./pages/Contact/Contact";
import Shipping from "./pages/Shipping/Shipping";
import FAQ from "./pages/FAQ/FAQ";
import AdminOrders from "./pages/AdminOrders/AdminOrders";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminProducts from "./pages/AdminProducts/AdminProducts";


function App() {
    return (
        <CartProvider>

            <BrowserRouter>

                <Routes>

                    <Route path="/" element={<Home />} />

                    <Route path="/women" element={<Women />} />

                    <Route path="/new-in" element={<NewIn />} />

                    <Route path="/collections" element={<Collections />} />

                    <Route
                        path="/product/:id"
                        element={<ProductDetails />}
                    />

                    <Route path="/cart" element={<Cart />} />

                    <Route path="/checkout" element={<Checkout />} />

                    <Route path="/orders" element={<Orders />} />

                    <Route path="/wishlist" element={<Wishlist />} />

                    <Route path="/search" element={<Search />} />

                    <Route path="/contact" element={<Contact />} />

                    <Route path="/shipping" element={<Shipping />} />

                    <Route path="/faq" element={<FAQ />} />

                    <Route path="/admin/orders" element={<AdminOrders />} />

                    <Route path="/admin/dashboard" element={<AdminDashboard />} />

                    <Route path="/admin/products" element={<AdminProducts />} />

                    <Route path="*" element={<NotFound />} />

                </Routes>

            </BrowserRouter>

        </CartProvider>
        
    );
}

export default App;