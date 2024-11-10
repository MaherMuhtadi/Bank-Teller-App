function ClientLogin({ onLogin }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        let dummyClient = {
            client_id: "1234567890",
            first_name: "John",
            last_name: "Doe",
            email: "john.doe@gmail.com",
            phone: "1234567890",
            password: "password",
            dob: "01/01/2000",
            client_identification_document_type: "Passport",
            client_identification_document_number: "AB123456789",
            residency: "Citizen",
            address: "123 Main St, Springfield, IL 62701",
            occupation: "Software Engineer",
            nominee_name: "Jane Doe",
            nominee_identification_document_type: "Passport",
            nominee_identification_document_number: "CD123456789",
            nominee_relation: "Spouse",
            branch_id: "101",
            product_id: "801",
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
