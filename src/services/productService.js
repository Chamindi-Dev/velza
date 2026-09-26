const API_URL = "http://localhost:5026/api/Products";
const ORDERS_API_URL = "http://localhost:5026/api/Orders";

export async function getProducts() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return await response.json();
}

export async function getProductById(id) {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch product");
    }

    return await response.json();
}

export async function createProduct(product) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });

    if (!response.ok) {
        const errorText = await response.text();

        console.error(
            "Create Product API Error:",
            response.status,
            errorText
        );

        throw new Error(
            `Failed to create product: ${response.status}`
        );
    }

    return await response.json();
}

export async function updateProduct(id, product) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });

    if (!response.ok) {
        const errorText = await response.text();

        console.error(
            "Update Product API Error:",
            response.status,
            errorText
        );

        throw new Error(
            `Failed to update product: ${response.status}`
        );
    }

    return await response.json();
}

export async function deleteProduct(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        const errorText = await response.text();

        console.error(
            "Delete Product API Error:",
            response.status,
            errorText
        );

        throw new Error(
            `Failed to delete product: ${response.status}`
        );
    }

    return true;
}

export async function createOrder(order) {
    const response = await fetch(ORDERS_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    });

    const responseText = await response.text();

    console.log("Order API Status:", response.status);
    console.log("Order API Response:", responseText);

    if (!response.ok) {
        let errorMessage = responseText;

        try {
            const errorObject = JSON.parse(responseText);

            errorMessage =
                errorObject.message ||
                errorObject.title ||
                errorObject.detail ||
                JSON.stringify(errorObject);
        } catch {
            // Keep the original response if it is not JSON
        }

        throw new Error(
            `Failed to create order: ${response.status} - ${errorMessage}`
        );
    }

    try {
        return JSON.parse(responseText);
    } catch {
        throw new Error(
            "Order was created, but the API returned an invalid response."
        );
    }
}

export async function getOrders() {
    const response = await fetch(ORDERS_API_URL);

    if (!response.ok) {
        const errorText = await response.text();

        console.error(
            "Get Orders API Error:",
            response.status,
            errorText
        );

        throw new Error(
            `Failed to fetch orders: ${response.status}`
        );
    }

    return await response.json();
}