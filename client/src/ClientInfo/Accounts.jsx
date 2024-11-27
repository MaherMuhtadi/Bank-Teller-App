import { useState, useEffect } from "react";
import LoadingAnimation from "../Components/LoadingAnimation";
import ErrorAlert from "../Components/ErrorAlert";
import TransactionHistory from "../Components/TransactionHistory";

function Accounts({ client_id, password }) {
    const apiUrl = "http://127.0.0.1:8000/account/";
    const [productsLoading, setProductsLoading] = useState(true);
    const [accountsLoading, setAccountsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [submissionError, setSubmissionError] = useState(null);

    const [accounts, setAccounts] = useState([]);
    const [products, setProducts] = useState([]);

    // State to manage currently viewed account and whether to show transactions
    const [viewingTransactions, setViewingTransactions] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [selectedProductName, setSelectedProductName] = useState("");

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

    const createNewAccount = async (accountData) => {
        try {
            const response = await fetch(apiUrl + "create_new_account/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(accountData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || response.statusText);
            }

            const data = await response.json();
            setAccounts([...accounts, data]); // Add the new account to the list of accounts
        } catch (error) {
            throw new Error(error.message); // Rethrow the error so it can be handled by the caller
        }
    };

    const handleAddAccount = async (product_id) => {
        let accountData = {
            client_id: client_id,
            product_id: product_id,
        };
        try {
            await createNewAccount(accountData);
        } catch (error) {
            setSubmissionError(error.message);
        }
    };

    if (productsLoading || accountsLoading) {
        return <LoadingAnimation />; // Show loading message while data is being fetched
    }

    if (fetchError) {
        return <ErrorAlert error={fetchError} />; // Display any error that occurs
    }

    // Conditional rendering for the transaction history or account view
    if (viewingTransactions && selectedAccount) {
        return (
            <TransactionHistory
                account_id={selectedAccount.account_id}
                product_name={selectedProductName}
                close={() => setViewingTransactions(false)} // Function to close transaction view
            />
        );
    }

    return (
        <div className="flex flex-col w-1/3 space-y-6">
            {products.map((product) => (
                <details
                    key={product.product_id}
                    className="flex flex-col space-y-6 bg-neutral-50 p-4 rounded-xl shadow-md"
                >
                    <summary className="flex space-x-6 cursor-pointer">
                        <img src="down-arrow.svg" alt="Drop Down Arrow" />
                        <h2 className="font-bold text-xl text-center">
                            {product.product_name} Accounts
                        </h2>
                    </summary>
                    <ol className="flex flex-col space-y-6">
                        {accounts
                            .filter(
                                (account) =>
                                    account.product_id === product.product_id
                            )
                            .map((account) => (
                                <li key={account.account_id}>
                                    <div className="flex justify-between">
                                        <div>
                                            <span className="font-bold">
                                                Account ID:
                                            </span>{" "}
                                            {account.account_id}
                                        </div>
                                        <span
                                            className="hover:underline cursor-pointer"
                                            onClick={() => {
                                                setSelectedAccount(account);
                                                setSelectedProductName(
                                                    product.product_name
                                                );
                                                setViewingTransactions(true);
                                            }}
                                        >
                                            View Transactions
                                        </span>
                                    </div>
                                    <span className="font-bold">Balance:</span>{" "}
                                    ${account.balance}
                                </li>
                            ))}
                    </ol>
                    <button
                        className="bg-blue-500 text-white rounded-md w-fit p-2"
                        onClick={() => handleAddAccount(product.product_id)}
                    >
                        Open New Account
                    </button>
                    {submissionError && <ErrorAlert error={submissionError} />}
                </details>
            ))}
        </div>
    );
}

export default Accounts;
