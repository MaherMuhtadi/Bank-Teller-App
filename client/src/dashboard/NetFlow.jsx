import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";
import LoadingAnimation from "../Components/LoadingAnimation";
import ErrorAlert from "../Components/ErrorAlert";

function NetFlow() {
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
            setLoading(false);
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
    }, []);

    if (loading) {
        return <LoadingAnimation />;
    }

    if (fetchError) {
        return <ErrorAlert error={fetchError} />;
    }

    // Register ChartJS plugins
    ChartJS.register(
        ArcElement,
        Tooltip,
        Legend,
        BarElement,
        CategoryScale,
        LinearScale
    );

    // Bar Chart Data for amounts
    const barChartData = {
        labels: ["Withdrawals", "Deposits"], // X-axis labels for each bar
        datasets: [
            {
                label: "Withdrawals",
                data: [data.total_withdrawals_amount],
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
            {
                label: "Deposits",
                data: [0, data.total_deposits_amount],
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };

    const barChartOptions = {
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Total Amount ($)",
                },
            },
        },
    };

    return (
        <div className="space-y-5 rounded-xl bg-neutral-50 p-4 shadow-md">
            <h2 className="font-bold text-xl">Net Cash Flow</h2>
            <p>Net: ${data.net_cash_flow}</p>
            <Bar data={barChartData} options={barChartOptions} />
        </div>
    );
}

export default NetFlow;
