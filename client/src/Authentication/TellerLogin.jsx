import React from "react";

const TellerLogin = () => {
    sessionStorage.removeItem("employee_id"); // Clear the session storage

    const handleLogin = () => {
        sessionStorage.setItem("employee_id", "12345"); // Example login logic
        window.location.href = "/"; // Redirect to the dashboard
    };

    return (
        <div className="flex justify-center items-center h-full">
            <button
                onClick={handleLogin}
                className="bg-blue-500 text-white rounded-md w-fit p-2"
            >
                Login
            </button>
        </div>
    );
};

export default TellerLogin;
