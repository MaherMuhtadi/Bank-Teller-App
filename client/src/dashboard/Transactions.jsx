function Transactions() {
    return (
        <nav className="rounded-xl bg-neutral-50 p-4 shadow-md">
            <h2 className="font-bold">Transactions</h2>
            <ul className="flex justify-between">
                <li>
                    <a href="transfer">
                        <figure className="text-center hover:underline">
                            <img
                                className="w-24 h-24 bg-lime-100 rounded-full p-3"
                                src="/transfer.svg"
                                alt="Transfer Icon"
                            />
                            <figcaption>Transfer</figcaption>
                        </figure>
                    </a>
                </li>
                <li>
                    <a href="cash">
                        <figure className="text-center hover:underline">
                            <img
                                className="w-24 h-24 bg-lime-100 rounded-full p-3"
                                src="/cash.svg"
                                alt="Cash Icon"
                            />
                            <figcaption>Cash</figcaption>
                        </figure>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Transactions;
