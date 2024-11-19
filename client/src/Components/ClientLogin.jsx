import { useState } from "react";
import ErrorAlert from "./ErrorAlert";

function ClientLogin({ onLogin }) {
    const apiUrl = "http://127.0.0.1:8000/account/";
    const [submissionError, setSubmissionError] = useState(null);

    const [loginData, setLoginData] = useState({
        client_id: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    async function getClient() {
        try {
            const response = await fetch(apiUrl + "get_client_details/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || response.statusText);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let clientData = await getClient();
            onLogin(clientData);
        } catch (error) {
            setSubmissionError(error.message);
        }
    };

    return (
        <div className="flex justify-center p-4">
            <form
                className="flex flex-col space-y-5 w-1/2 min-w-fit"
                onSubmit={handleSubmit}
            >
                <h2 className="font-bold text-xl text-center">Client Login</h2>

                {submissionError && <ErrorAlert error={submissionError} />}

                <div className="flex flex-col space-y-5">
                    <label htmlFor="login_client_id">Client ID:</label>
                    <input
                        id="login_client_id"
                        type="text"
                        name="client_id"
                        onChange={handleChange}
                        className="rounded-md border text-lg p-1"
                    />
                </div>
                <div className="flex flex-col space-y-5">
                    <label htmlFor="login_password">Password:</label>
                    <input
                        id="login_password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        className="rounded-md border text-lg p-1"
                    />
                </div>
                <button
                    className="bg-blue-500 text-white rounded-md w-fit p-2 self-end"
                    type="submit"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default ClientLogin;
