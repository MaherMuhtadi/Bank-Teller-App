import React, { useState, useEffect } from "react";
import LoadingAnimation from "./LoadingAnimation";
import ErrorAlert from "./ErrorAlert";

function TransactionHistory({ account_id, product_name, close }) {
    const apiUrl = "http://127.0.0.1:8000/account/";
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    const [debitList, setDebitList] = useState([]);
    const [creditList, setCreditList] = useState([]);
    const [showDebit, setShowDebit] = useState(true); // State to toggle between tables

    async function getData() {
        try {
            const response = await fetch(
                apiUrl + "transactionListforAccount/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ account_id }),
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || response.statusText);
            }
            const data = await response.json();
            setDebitList(data.debit);
            setCreditList(data.credit);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            setLoading(false); // Set loading to false once done
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getData();
            } catch (error) {
                setFetchError(error.message);
            }
        };
        fetchData();
    }, []); // Run only once when the component mounts

    if (loading) {
        return <LoadingAnimation />; // Show loading message while data is being fetched
    }

    if (fetchError) {
        return <ErrorAlert error={fetchError} />; // Display any error that occurs
    }

    return (
        <div className="bg-neutral-50 p-4 rounded-xl shadow-md">
            <img
                src="back.svg"
                alt="Back"
                className="w-5 cursor-pointer"
                onClick={close}
            />
            <h2 className="font-bold text-xl text-center">
                Account: {account_id} - {product_name}
            </h2>
            <div>
                <button onClick={() => setShowDebit(true)}>Show Debit</button>
                <button onClick={() => setShowDebit(false)}>Show Credit</button>
            </div>

            {showDebit && (
                <div>
                    <h3>Debit Transactions</h3>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Type</th>
                                <th>To</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {debitList.map((transaction) => {
                                const date = new Date(transaction.timestamp);
                                const formattedDate = date.toLocaleDateString();
                                const formattedTime = date.toLocaleTimeString();

                                return (
                                    <tr key={transaction.transaction_id}>
                                        <td>{transaction.transaction_id}</td>
                                        <td>{transaction.transaction_type}</td>
                                        <td>{transaction.to_account_id}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{formattedDate}</td>
                                        <td>{formattedTime}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {!showDebit && (
                <div>
                    <h3>Credit Transactions</h3>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Type</th>
                                <th>From</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {creditList.map((transaction) => {
                                const date = new Date(transaction.timestamp);
                                const formattedDate = date.toLocaleDateString();
                                const formattedTime = date.toLocaleTimeString();

                                return (
                                    <tr key={transaction.transaction_id}>
                                        <td>{transaction.transaction_id}</td>
                                        <td>{transaction.transaction_type}</td>
                                        <td>{transaction.from_account_id}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{formattedDate}</td>
                                        <td>{formattedTime}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default TransactionHistory;
