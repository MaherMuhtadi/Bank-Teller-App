function Clients() {
    return (
        <nav className="rounded-xl space-y-5 bg-neutral-50 p-4 shadow-md">
            <h2 className="font-bold text-xl">Clients</h2>
            <ul className="flex justify-between">
                <li>
                    <a href="client_info">
                        <figure className="text-center hover:underline hover:scale-90 transition-transform">
                            <div className="w-24 h-24 bg-slate-300 rounded-full p-3 flex justify-center items-center">
                                <img
                                    src="/view-client.svg"
                                    alt="Client Info Icon"
                                />
                            </div>
                            <figcaption>View Client</figcaption>
                        </figure>
                    </a>
                </li>
                <li>
                    <a href="client_registration">
                        <figure className="text-center hover:underline hover:scale-90 transition-transform">
                            <div className="w-24 h-24 bg-slate-300 rounded-full p-3 flex justify-center items-center">
                                <img
                                    src="/client-registration.svg"
                                    alt="Client Registration Icon"
                                />
                            </div>
                            <figcaption>Registration</figcaption>
                        </figure>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Clients;
