import { useState } from "react";
import ErrorAlert from "../Components/ErrorAlert";

const TellerLogin = () => {
    sessionStorage.removeItem("employee_id"); // Clear the session storage

    const [loginData, setLoginData] = useState({
        employee_id: "",
        password: "",
    });
    const [submissionError, setSubmissionError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sessionStorage.setItem("employee_id", loginData.employee_id); // Example login logic
        window.location.href = "/"; // Redirect to the dashboard
    };

    return (
        <div className="flex justify-center p-4">
            <form
                className="flex flex-col space-y-5 w-1/2 min-w-fit"
                onSubmit={handleSubmit}
            >
                <h2 className="font-bold text-xl text-center">Teller Login</h2>

                {submissionError && <ErrorAlert error={submissionError} />}

                <div className="flex flex-col space-y-5">
                    <label htmlFor="login_employee_id">Employee ID:</label>
                    <input
                        id="login_employee_id"
                        type="text"
                        name="employee_id"
                        onChange={handleChange}
                        className="rounded-md border text-lg p-1"
                    />
                </div>
                <div className="flex flex-col space-y-5">
                    <label htmlFor="login_employee_password">Password:</label>
                    <input
                        id="login_employee_password"
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
};

export default TellerLogin;
