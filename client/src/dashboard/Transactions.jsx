function Transactions() {
    return (
        <nav className="rounded-xl space-y-5 bg-neutral-50 p-4 shadow-md">
            <h2 className="font-bold text-xl">Transactions</h2>
            <ul className="flex justify-between">
                <li>
                    <a href="transfer">
                        <figure className="text-center hover:underline hover:scale-90 transition-transform">
                            <div className="w-24 h-24 bg-lime-100 rounded-full p-3 flex justify-center items-center">
                                <img src="/transfer.svg" alt="Transfer Icon" />
                            </div>
                            <figcaption>Transfer</figcaption>
                        </figure>
                    </a>
                </li>
                <li>
                    <a href="cash">
                        <figure className="text-center hover:underline hover:scale-90 transition-transform">
                            <div className="w-24 h-24 bg-lime-100 rounded-full p-3 flex justify-center items-center">
                                <img src="/cash.svg" alt="Cash Icon" />
                            </div>
                            <figcaption>Cash</figcaption>
                        </figure>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Transactions;
