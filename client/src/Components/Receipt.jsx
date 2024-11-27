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
                <span className="font-bold">Account ID:</span>{" "}
                {transaction.from_account_id}
            </p>
            <p>
                <span className="font-bold">Tansaction ID:</span>{" "}
                {transaction.transaction_id}
            </p>
            <p>
                <span className="font-bold">Transaction Type:</span>{" "}
                {transaction.transaction_type}
            </p>
            <p>
                <span className="font-bold">Amount:</span> {transaction.amount}
            </p>
            {transaction.to_account_id && (
                <p>
                    <span className="font-bold">To:</span>{" "}
                    {transaction.to_account_id}
                </p>
            )}
            <p>
                <span className="font-bold">New Balance:</span>{" "}
                {transaction.updated_balance}
            </p>
            <p>
                <span className="font-bold">Date:</span> {formattedDate}
            </p>
            <p>
                <span className="font-bold">Time:</span> {formattedTime}
            </p>
        </div>
    );
}

export default Receipt;
