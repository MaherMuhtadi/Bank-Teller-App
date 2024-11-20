import { useState, useEffect } from "react";
import LoadingAnimation from "../Components/LoadingAnimation";
import ErrorAlert from "../Components/ErrorAlert";

function Summaries() {
    const apiUrl = "http://127.0.0.1:8000/account/";
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [data, setData] = useState({});

    async function getData() {
        try {
            const response = await fetch(apiUrl + "transaction_summary/", {
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
            setData(data);
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
        <div className="rounded-xl bg-neutral-50 w-1/4 p-4 shadow-md">
            <h2 className="font-bold text-xl mb-4">Transaction Summary</h2>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span>Total Transactions:</span>
                    <span className="font-semibold">
                        {data.total_transactions_count || 0}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Total Deposits:</span>
                    <span className="font-semibold">
                        {data.total_deposits_count || 0}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Total Withdrawals:</span>
                    <span className="font-semibold">
                        {data.total_withdrawals_count || 0}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Total Transfers:</span>
                    <span className="font-semibold">
                        {data.total_transfer_count || 0}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Total Withdrawal Amount:</span>
                    <span className="font-semibold">
                        ${data.total_withdrawals_amount || "0.00"}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Total Deposit Amount:</span>
                    <span className="font-semibold">
                        ${data.total_deposits_amount || "0.00"}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Summaries;
