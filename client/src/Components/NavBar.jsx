function NavBar() {
    return (
        <nav className="flex justify-between p-4 z-10 sticky top-0 bg-gradient-to-r from-neutral-100/95 to-emerald-100/95 shadow-lg">
            <h1 className="font-black text-2xl">Bank Teller App</h1>
            <ul className="flex space-x-6">
                <li className="hover:underline">
                    <a href="/">
                        <figure className="flex space-x-1">
                            <img
                                src="/dashboard.svg"
                                alt="Dashboard Icon"
                                className="w-5"
                            />
                            <figcaption>Dashboard</figcaption>
                        </figure>
                    </a>
                </li>
                <li className="hover:underline">
                    <a href="/messages">
                        <figure className="flex space-x-1">
                            <img
                                src="/messages.svg"
                                alt="Messages Icon"
                                className="w-5"
                            />
                            <figcaption>Messages</figcaption>
                        </figure>
                    </a>
                </li>
                <li className="hover:underline">
                    <a href="/colleagues">
                        <figure className="flex space-x-1">
                            <img
                                src="/colleagues.svg"
                                alt="Colleagues Icon"
                                className="w-5"
                            />
                            <figcaption>Colleagues</figcaption>
                        </figure>
                    </a>
                </li>
                <li className="hover:underline">
                    <a href="/products">
                        <figure className="flex space-x-1">
                            <img
                                src="/products.svg"
                                alt="Products Icon"
                                className="w-5"
                            />
                            <figcaption>Products</figcaption>
                        </figure>
                    </a>
                </li>
            </ul>
            <a className="hover:underline" href="/sign_in">
                <figure className="flex space-x-1">
                    <img
                        src="/sign-out.svg"
                        alt="Sign Out Icon"
                        className="w-5"
                    />
                    <figcaption>Sign Out</figcaption>
                </figure>
            </a>
        </nav>
    );
}

export default NavBar;
