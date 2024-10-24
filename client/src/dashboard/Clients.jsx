function Clients() {
    return (
        <nav className="rounded-xl bg-neutral-50 p-4 shadow-md">
            <h2 className="font-bold">Clients</h2>
            <ul className="flex justify-between">
                <li>
                    <a href="client_info">
                        <figure className="text-center hover:underline">
                            <img
                                className="w-24 h-24 bg-slate-300 rounded-full p-3"
                                src="/view-client.svg"
                                alt="Client Info Icon"
                            />
                            <figcaption>View Client</figcaption>
                        </figure>
                    </a>
                </li>
                <li>
                    <a href="client_registration">
                        <figure className="text-center hover:underline">
                            <img
                                className="w-24 h-24 bg-slate-300 rounded-full p-3"
                                src="/client-registration.svg"
                                alt="Client Registration Icon"
                            />
                            <figcaption>Registration</figcaption>
                        </figure>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Clients;
