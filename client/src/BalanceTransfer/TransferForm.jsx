import { useState, useEffect } from "react";
import LoadingAnimation from "../Components/LoadingAnimation";

function TransferForm({ client_id, password }) {
    const apiUrl = "http://127.0.0.1:8000/account/";
    const [productsLoading, setProductsLoading] = useState(true);
    const [accountsLoading, setAccountsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [accounts, setAccounts] = useState([]);
    const [products, setProducts] = useState([]);
    const transaction_types = ["Interact e-Transfer"];

    const [formData, setFormData] = useState({
        transaction_type: transaction_types[0],
        from_account_id: "",
        to_account_id: "",
        amount: 0,
    });

    async function getAccounts() {
        try {
            const response = await fetch(apiUrl + "account_list_for_client/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    client_id: client_id,
                    password: password,
                }),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setAccounts(data);
        } catch (error) {
            setError(error.message); // Set error if any occurs
            console.error("Error fetching accounts:", error);
        } finally {
            setAccountsLoading(false); // Set loading to false once done
        }
    }

    async function getProducts() {
        try {
            const response = await fetch(apiUrl + "get_product_list/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            setError(error.message); // Set error if any occurs
            console.error("Error fetching products:", error);
        } finally {
            setProductsLoading(false); // Set loading to false once done
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevValues) => ({
            ...prevValues,
            [name]: name === "amount" ? parseFloat(value) : value, // Convert amount to a number
        }));
    };

    useEffect(() => {
        getAccounts();
        getProducts();
    }, []); // Empty dependency array to run only once when the component mounts

    const transferAmount = async () => {
        try {
            const response = await fetch(apiUrl + "transaction/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            setError(error.message); // Set error if any occurs
            console.error("Error transferring amount:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await transferAmount();
        if (data) {
            alert("Amount transferred successfully!");
        }
    };

    if (productsLoading || accountsLoading) {
        return <LoadingAnimation />; // Show loading message while data is being fetched
    }

    if (error) {
        return <div className="flex justify-center">{error}</div>; // Display any error that occurs
    }

    return (
        <form className="flex flex-col space-y-6 w-1/2" onSubmit={handleSubmit}>
            <h2 className="font-bold text-xl text-center">Balance Transfer</h2>

            <div className="flex flex-col space-y-5">
                <label htmlFor="transfer_transaction_type">
                    Transaction Type
                </label>
                <select
                    id="transfer_transaction_type"
                    name="transaction_type"
                    value={formData.transaction_type}
                    onChange={handleChange}
                    className="rounded-md border text-lg p-1"
                >
                    {transaction_types.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col space-y-5">
                <label htmlFor="transfer_from">From Account</label>
                <select
                    id="transfer_from"
                    name="from_account_id"
                    value={formData.from_account_id}
                    onChange={handleChange}
                    className="rounded-md border text-lg p-1"
                >
                    <option value="">Select an account</option>
                    {accounts.map((account) => (
                        <option
                            key={account.account_id}
                            value={account.account_id}
                        >
                            {account.account_id} -{" "}
                            {
                                products.find(
                                    (product) =>
                                        product.product_id ===
                                        account.product_id
                                ).product_name
                            }
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col space-y-5">
                <label htmlFor="transfer_to">To Account</label>
                <input
                    id="transfer_to"
                    type="text"
                    name="to_account_id"
                    value={formData.to_account_id}
                    onChange={handleChange}
                    className="rounded-md border text-lg p-1"
                />
            </div>

            <div className="flex flex-col space-y-5">
                <label htmlFor="transfer_amount">Amount</label>
                <input
                    id="tranfer_amount"
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="rounded-md border text-lg p-1"
                />
            </div>
            <button
                className="bg-blue-500 text-white rounded-md w-fit p-2 self-end"
                type="submit"
            >
                Transfer
            </button>
        </form>
    );
}

export default TransferForm;
