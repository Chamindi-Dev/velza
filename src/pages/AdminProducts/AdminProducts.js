import { useEffect, useState } from "react";
import AdminNav from "../../components/AdminNav/AdminNav";
import Footer from "../../components/Footer/Footer";
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct as deleteProductFromAPI
} from "../../services/productService";
import "./AdminProducts.css";

function AdminProducts() {

    // Store products from API
    const [products, setProducts] = useState([]);

    // Loading state
    const [loading, setLoading] = useState(true);

    // Error state
    const [error, setError] = useState("");

    // Show / hide form
    const [showForm, setShowForm] = useState(false);

    // Product currently being edited
    const [editingProductId, setEditingProductId] =
        useState(null);

    // Form data
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        collection: "",
        badge: "",
        image: "",
        sizes: "S, M, L, XL",
        description: ""
    });


    // ==========================================
    // LOAD PRODUCTS FROM API
    // ==========================================

    useEffect(() => {

        loadProducts();

    }, []);


    const loadProducts = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getProducts();

            setProducts(data);

        } catch (error) {

            console.error(
                "Failed to load products:",
                error
            );

            setError(
                "Failed to load products. Please make sure the API is running."
            );

        } finally {

            setLoading(false);

        }
    };


    // ==========================================
    // HANDLE FORM CHANGES
    // ==========================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    // ==========================================
    // ADD / EDIT PRODUCT
    // ==========================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        // Required fields
        if (
            !formData.name ||
            !formData.price ||
            !formData.category ||
            !formData.image
        ) {

            alert(
                "Please fill in all required fields."
            );

            return;
        }


        // Convert sizes string into ProductSize objects
        const sizes = formData.sizes
            .split(",")
            .map((size) => size.trim())
            .filter((size) => size !== "")
            .map((size) => ({
                size: size
            }));


        // Product object for API
        const productData = {

            name: formData.name,

            price: Number(
                formData.price
            ),

            category: formData.category,

            collection: formData.collection,

            badge: formData.badge || null,

            image: formData.image,

            sizes: sizes,

            description: formData.description,

            isActive: true
        };


        try {

            // ==================================
            // EDIT PRODUCT
            // ==================================

            if (editingProductId !== null) {

                const updatedProduct =
                    await updateProduct(
                        editingProductId,
                        {
                            id: editingProductId,
                            ...productData
                        }
                    );


                setProducts((currentProducts) =>
                    currentProducts.map(
                        (product) =>
                            product.id ===
                            editingProductId
                                ? updatedProduct
                                : product
                    )
                );


                alert(
                    "Product updated successfully!"
                );

            }


            // ==================================
            // ADD PRODUCT
            // ==================================

            else {

                const newProduct =
                    await createProduct(
                        productData
                    );


                setProducts((currentProducts) => [
                    ...currentProducts,
                    newProduct
                ]);


                alert(
                    "Product added successfully!"
                );

            }


            // Reset form
            resetForm();

        } catch (error) {

            console.error(
                "Product save error:",
                error
            );

            alert(
                "Failed to save product. Please try again."
            );

        }

    };


    // ==========================================
    // EDIT PRODUCT
    // ==========================================

    const editProduct = (product) => {

        setFormData({

            name:
                product.name || "",

            price:
                product.price || "",

            category:
                product.category || "",

            collection:
                product.collection || "",

            badge:
                product.badge || "",

            image:
                product.image || "",

            sizes:
                Array.isArray(product.sizes)
                    ? product.sizes
                        .map((size) => size.size)
                        .join(", ")
                    : "S, M, L, XL",

            description:
                product.description || ""

        });


        setEditingProductId(
            product.id
        );

        setShowForm(true);


        // Scroll to form
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // ==========================================
    // DELETE PRODUCT
    // ==========================================

    const handleDeleteProduct = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this product?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            await deleteProductFromAPI(id);


            setProducts((currentProducts) =>
                currentProducts.filter(
                    (product) =>
                        product.id !== id
                )
            );


            alert(
                "Product deleted successfully!"
            );

        } catch (error) {

            console.error(
                "Delete product error:",
                error
            );

            alert(
                "Failed to delete product. Please try again."
            );

        }

    };


    // ==========================================
    // RESET FORM
    // ==========================================

    const resetForm = () => {

        setFormData({

            name: "",
            price: "",
            category: "",
            collection: "",
            badge: "",
            image: "",
            sizes: "S, M, L, XL",
            description: ""

        });

        setEditingProductId(null);

        setShowForm(false);

    };


    // ==========================================
    // CLOSE FORM
    // ==========================================

    const closeForm = () => {

        resetForm();

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="admin-products-page">

                <AdminNav />

                <section className="admin-products-container">

                    <p className="no-admin-products">
                        Loading products...
                    </p>

                </section>

                <Footer />

            </div>

        );

    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="admin-products-page">

            <AdminNav />


            <section className="admin-products-container">


                {/* ERROR MESSAGE */}

                {error && (

                    <p className="no-admin-products">
                        {error}
                    </p>

                )}


                {/* PAGE HEADING */}

                <div className="admin-products-heading">

                    <h1>
                        Manage Products
                    </h1>


                    <button
                        type="button"
                        className="add-product-button"
                        onClick={() => {

                            if (showForm) {

                                closeForm();

                            } else {

                                setShowForm(true);

                            }

                        }}
                    >

                        {showForm
                            ? "CLOSE"
                            : "ADD PRODUCT"}

                    </button>

                </div>


                {/* ADD / EDIT PRODUCT FORM */}

                {showForm && (

                    <form
                        className="add-product-form"
                        onSubmit={handleSubmit}
                    >

                        <h2>

                            {editingProductId !== null
                                ? "Edit Product"
                                : "Add New Product"}

                        </h2>


                        <div className="product-form-grid">


                            {/* Product Name */}

                            <div className="product-form-group">

                                <label>
                                    Product Name *
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Product name"
                                />

                            </div>


                            {/* Price */}

                            <div className="product-form-group">

                                <label>
                                    Price *
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="4500"
                                />

                            </div>


                            {/* Category */}

                            <div className="product-form-group">

                                <label>
                                    Category *
                                </label>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select category
                                    </option>

                                    <option value="Women">
                                        Women
                                    </option>

                                    <option value="Dresses">
                                        Dresses
                                    </option>

                                    <option value="Tops">
                                        Tops
                                    </option>

                                    <option value="Bottoms">
                                        Bottoms
                                    </option>

                                </select>

                            </div>


                            {/* Collection */}

                            <div className="product-form-group">

                                <label>
                                    Collection
                                </label>

                                <select
                                    name="collection"
                                    value={formData.collection}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select collection
                                    </option>

                                    <option value="Summer">
                                        Summer
                                    </option>

                                    <option value="Evening">
                                        Evening
                                    </option>

                                    <option value="Everyday">
                                        Everyday
                                    </option>

                                </select>

                            </div>


                            {/* Badge */}

                            <div className="product-form-group">

                                <label>
                                    Badge
                                </label>

                                <select
                                    name="badge"
                                    value={formData.badge}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        No Badge
                                    </option>

                                    <option value="NEW">
                                        NEW
                                    </option>

                                    <option value="SALE">
                                        SALE
                                    </option>

                                </select>

                            </div>


                            {/* Image */}

                            <div className="product-form-group">

                                <label>
                                    Image Path *
                                </label>

                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="/images/product.png"
                                />

                            </div>


                            {/* Sizes */}

                            <div className="product-form-group">

                                <label>
                                    Sizes
                                </label>

                                <input
                                    type="text"
                                    name="sizes"
                                    value={formData.sizes}
                                    onChange={handleChange}
                                    placeholder="S, M, L, XL"
                                />

                            </div>


                        </div>


                        {/* Description */}

                        <div className="product-form-group">

                            <label>
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Product description"
                                rows="4"
                            />

                        </div>


                        {/* SAVE BUTTON */}

                        <button
                            type="submit"
                            className="save-product-button"
                        >

                            {editingProductId !== null
                                ? "UPDATE PRODUCT"
                                : "ADD PRODUCT"}

                        </button>

                    </form>

                )}


                {/* PRODUCT LIST */}

                {products.length === 0 ? (

                    <p className="no-admin-products">
                        No products available.
                    </p>

                ) : (

                    <div className="admin-products-grid">

                        {products.map((product) => (

                            <div
                                className="admin-product-card"
                                key={product.id}
                            >


                                {/* Product Image */}

                                <div className="admin-product-image">

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                    />


                                    {product.badge && (

                                        <span className="admin-product-badge">

                                            {product.badge}

                                        </span>

                                    )}

                                </div>


                                {/* Product Information */}

                                <div className="admin-product-info">

                                    <h3>
                                        {product.name}
                                    </h3>


                                    <p>
                                        Category:{" "}
                                        {product.category}
                                    </p>


                                    {product.collection && (

                                        <p>
                                            Collection:{" "}
                                            {product.collection}
                                        </p>

                                    )}


                                    <p className="admin-product-price">

                                        Rs.{" "}
                                        {Number(
                                            product.price
                                        ).toLocaleString()}

                                    </p>


                                    {/* Buttons */}

                                    <div className="product-action-buttons">


                                        {/* EDIT */}

                                        <button
                                            type="button"
                                            className="edit-product-button"
                                            onClick={() =>
                                                editProduct(product)
                                            }
                                        >

                                            EDIT

                                        </button>


                                        {/* DELETE */}

                                        <button
                                            type="button"
                                            className="delete-product-button"
                                            onClick={() =>
                                                handleDeleteProduct(
                                                    product.id
                                                )
                                            }
                                        >

                                            DELETE

                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>


            <Footer />

        </div>

    );
}

export default AdminProducts;