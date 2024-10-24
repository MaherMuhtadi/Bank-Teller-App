function NavBar() {
    return (
        <nav className="flex justify-between p-4 sticky top-0 bg-gradient-to-l from-neutral-100/95 to-emerald-100/95 shadow-lg">
            <h1 className="font-black text-lg">Bank Teller App</h1>
            <ul className="flex space-x-6">
                <li className="hover:underline">
                    <a href="/">Dashboard</a>
                </li>
                <li className="hover:underline">
                    <a href="/messages">Messages</a>
                </li>
                <li className="hover:underline">
                    <a href="/colleagues">Colleagues</a>
                </li>
                <li className="hover:underline">
                    <a href="/products">Products</a>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
