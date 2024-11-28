import { useState, useEffect } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import ErrorAlert from "../Components/ErrorAlert";

function Products() {
    const apiUrl = "http://127.0.0.1:8000/account/";
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [products, setProducts] = useState([]);

    async function getProducts() {
        try {
            const response = await fetch(apiUrl + "get_product_list/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || response.statusText);
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await getProducts();
            } catch (error) {
                setFetchError(error.message);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (fetchError) {
        return <ErrorAlert error={fetchError} />;
    }

    return (
        <div className="p-4 space-y-5">
            <h2 className="font-bold text-xl text-center">Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {products.map((product) => (
                    <div
                        key={product.product_id}
                        className="bg-neutral-50 p-4 rounded-xl shadow-md space-y-5"
                    >
                        <h3 className="font-semibold text-lg">
                            {product.product_name} Accounts
                        </h3>
                        <p>{product.description}</p>
                        <ul className="divide-y divide-gray-300 space-y-5">
                            <li>
                                <span className="font-semibold">
                                    Transaction Limit:
                                </span>{" "}
                                {product.transaction_limit}
                            </li>
                            <li>
                                <span className="font-semibold">
                                    Interest Rate:
                                </span>{" "}
                                {product.interest_rate}
                            </li>
                            <li>
                                <span className="font-semibold">
                                    Monthly Fee:
                                </span>{" "}
                                {product.monthly_fee}
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
