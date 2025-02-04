import { useState, useEffect } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import ErrorAlert from "../Components/ErrorAlert";
import Receipt from "../Components/Receipt";

function CashForm({ client_id, password }) {
    const apiUrl = "http://127.0.0.1:8000/account/";
    const [productsLoading, setProductsLoading] = useState(true);
    const [accountsLoading, setAccountsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [submissionError, setSubmissionError] = useState(null);

    const [accounts, setAccounts] = useState([]);
    const [products, setProducts] = useState([]);
    const transaction_types = ["Deposit", "Withdrawal"];

    const [formData, setFormData] = useState({
        transaction_type: transaction_types[0],
        account_id: "",
        amount: 0,
        timestamp: new Date().toISOString(),
    });

    const [transaction_details, setTransactionDetails] = useState(null);

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
                const errorData = await response.json();
                throw new Error(errorData.error || response.statusText);
            }
            const data = await response.json();
            setAccounts(data);
        } catch (error) {
            throw new Error(error.message);
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
                const errorData = await response.json();
                throw new Error(errorData.error || response.statusText);
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            throw new Error(error.message);
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
        const fetchData = async () => {
            try {
                await Promise.all([getAccounts(), getProducts()]);
            } catch (error) {
                setFetchError(error.message);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run only once when the component mounts

    const transferAmount = async (type, transferData) => {
        let apiRoute = type === "Deposit" ? "deposit/" : "withdraw/";
        try {
            const response = await fetch(apiUrl + apiRoute, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(transferData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || response.statusText);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let type = formData.transaction_type;
        let transferData = {
            account_no: formData.account_id,
            amount: formData.amount,
            timestamp: new Date().toISOString(),
        };
        try {
            const data = await transferAmount(type, transferData);
            if (data) {
                setTransactionDetails(data);
            }
        } catch (error) {
            setSubmissionError(error.message);
        }
    };

    const clearTransactionDetails = () => {
        setTransactionDetails(null);
    };

    if (productsLoading || accountsLoading) {
        return <LoadingSpinner />; // Show loading message while data is being fetched
    }

    if (fetchError) {
        return <ErrorAlert error={fetchError} />; // Show error message if any occurs
    }

    return (
        <form
            className="relative flex flex-col space-y-6 w-1/2"
            onSubmit={handleSubmit}
        >
            <h2 className="font-bold text-xl text-center">Cash Transaction</h2>

            {submissionError && <ErrorAlert error={submissionError} />}

            {transaction_details && (
                <Receipt
                    transaction={transaction_details}
                    close={clearTransactionDetails}
                />
            )}

            <div className="flex flex-col space-y-5">
                <label htmlFor="cash_transaction_type">Transaction Type</label>
                <select
                    id="cash_transaction_type"
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
                <label htmlFor="cash_account">Account</label>
                <select
                    id="cash_account"
                    name="account_id"
                    value={formData.account_id}
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
                <label htmlFor="cash_amount">Amount</label>
                <input
                    id="cash_amount"
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
                Confirm
            </button>
        </form>
    );
}

export default CashForm;
