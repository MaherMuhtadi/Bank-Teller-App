function Receipt({ transaction, close }) {
    const date = new Date(transaction.timestamp);
    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    const handlePrint = () => {
        const printWindow = window.open("", "_blank"); // Open a new window
        if (printWindow) {
            printWindow.document.open();
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <title>Print Receipt</title>
                    </head>
                    <body>
                        <h2>Transaction Details</h2>
                        <p><span style="font-weight: bold;">Account ID:</span> ${
                            transaction.transaction_type === "Deposit"
                                ? transaction.to_account_id
                                : transaction.from_account_id
                        }</p>
                        <p><span style="font-weight: bold;">Tansaction ID:</span> ${
                            transaction.transaction_id
                        }</p>
                        <p><span style="font-weight: bold;">Transaction Type:</span> ${
                            transaction.transaction_type
                        }</p>
                        <p><span style="font-weight: bold;">Amount:</span> ${
                            transaction.amount
                        }</p>
                        ${
                            transaction.transaction_type.toLowerCase() ===
                            "transfer"
                                ? `<p><span style="font-weight: bold;">To:</span> ${transaction.to_account_id}</p>`
                                : ""
                        }
                        <p><span style="font-weight: bold;">New Balance:</span> ${
                            transaction.updated_balance
                        }</p>
                        <p><span style="font-weight: bold;">Date:</span> ${formattedDate}</p>
                        <p><span style="font-weight: bold;">Time:</span> ${formattedTime}</p>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        }
    };

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-50 p-4 rounded-xl shadow-md h-fit w-1/2">
            <div className="flex justify-between">
                <h2 className="font-bold text-xl">Transaction Details</h2>
                <img
                    src="close.svg"
                    alt="Close"
                    className="w-5 cursor-pointer"
                    onClick={close}
                />
            </div>
            <p>
                <span className="font-semibold">Account ID:</span>{" "}
                {transaction.transaction_type.toLowerCase() === "deposit"
                    ? transaction.to_account_id
                    : transaction.from_account_id}
            </p>
            <p>
                <span className="font-semibold">Tansaction ID:</span>{" "}
                {transaction.transaction_id}
            </p>
            <p>
                <span className="font-semibold">Transaction Type:</span>{" "}
                {transaction.transaction_type}
            </p>
            <p>
                <span className="font-semibold">Amount:</span>{" "}
                {transaction.amount}
            </p>
            {transaction.transaction_type.toLowerCase() === "transfer" && (
                <p>
                    <span className="font-semibold">To:</span>{" "}
                    {transaction.to_account_id}
                </p>
            )}
            <p>
                <span className="font-semibold">New Balance:</span>{" "}
                {transaction.updated_balance}
            </p>
            <p>
                <span className="font-semibold">Date:</span> {formattedDate}
            </p>
            <p>
                <span className="font-semibold">Time:</span> {formattedTime}
            </p>
            <div className="flex justify-end">
                <img
                    src="print.svg"
                    alt="Print"
                    className="w-12 cursor-pointer"
                    onClick={handlePrint}
                />
            </div>
        </div>
    );
}

export default Receipt;
