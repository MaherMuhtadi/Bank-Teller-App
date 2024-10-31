function ClientLogin({ onLogin }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        let dummyClient = {
            firstname: "John",
            lastname: "Doe",
            occupation: "Worker",
            dob: "01/01/1990",
            residency: "Citizen",
            address: "1234 Elm St",
            email: "JohnDoe@gmail.com",
            password: "password",
            phone: "123-456-7890",
            nominee: "Jane Doe",
            branch: "Downtown",
            account_type: "Checking",
        };
        onLogin(dummyClient);
    };

    return (
        <div className="flex justify-center p-4">
            <form
                className="flex flex-col space-y-5 w-1/2 min-w-fit"
                onSubmit={handleSubmit}
            >
                <h2 className="font-bold text-center">Client Login</h2>
                <div className="flex flex-col space-y-5">
                    <label htmlFor="login_client_id">Client ID:</label>
                    <input
                        id="login_client_id"
                        type="text"
                        name="client_id"
                        className="rounded-md border text-lg p-1"
                    />
                </div>
                <div className="flex flex-col space-y-5">
                    <label htmlFor="login_password">Password:</label>
                    <input
                        id="login_password"
                        type="password"
                        name="password"
                        className="rounded-md border text-lg p-1"
                    />
                </div>
                <button
                    className="bg-green-500 rounded-md w-fit p-2 self-end"
                    type="submit"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default ClientLogin;
