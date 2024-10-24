function NavBar() {
    return (
        <nav className="flex justify-between p-4 sticky top-0">
            <h1 className="font-black">Bank Teller App</h1>
            <ul className="flex space-x-6">
                <li>
                    <a href="/">Dashboard</a>
                </li>
                <li>
                    <a href="/messages">Messages</a>
                </li>
                <li>
                    <a href="/colleagues">Colleagues</a>
                </li>
                <li>
                    <a href="/products">Products</a>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
