// For testing purpose, this component is not going to be used

import { useState, useEffect } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import ErrorAlert from "../Components/ErrorAlert";

function CreateTeller() {
    sessionStorage.removeItem("employee_id"); // Clear the session storage

    const apiUrl = "http://127.0.0.1:8000/account/";
    const [branchesLoading, setBranchesLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [submissionError, setSubmissionError] = useState(null);

    const [formValues, setFormValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        dob: "",
        address: "",
        branch_id: "", // Set once branches are loaded
    });
    const [branches, setBranches] = useState([]);

    async function getBranches() {
        try {
            const response = await fetch(apiUrl + "get_branch_list/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || response.statusText);
            }
            const data = await response.json();
            setBranches(data);
        } catch (error) {
            throw new Error(error.message); // Rethrow the error so it can be handled by the caller
        } finally {
            setBranchesLoading(false); // Set loading to false once done
        }
    }

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                await getBranches();
            } catch (error) {
                setFetchError(error.message);
            }
        };
        fetchBranches();
    }, []); // Run only once when the component mounts

    // Update branch_id once branches are loaded
    useEffect(() => {
        if (branches.length > 0) {
            setFormValues((prevValues) => ({
                ...prevValues,
                branch_id: branches[0].branch_id,
            }));
        }
    }, [branches]); // Run only when branches are updated

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const createNewTeller = async () => {
        try {
            const response = await fetch(apiUrl + "create_employee/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || response.statusText);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error.message); // Rethrow the error so it can be handled by the caller
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let tellerData = await createNewTeller();
            sessionStorage.setItem("employee_id", tellerData.employee_id);
            sessionStorage.setItem(
                "employee_first_name",
                tellerData.first_name
            );
            window.location.href = "/"; // Redirect to the dashboard
        } catch (error) {
            setSubmissionError(error.message);
        }
    };

    if (branchesLoading) {
        return <LoadingSpinner />; // Show loading message while data is being fetched
    }

    if (fetchError) {
        return <ErrorAlert error={fetchError} />; // Show error message if data fetching fails
    }

    return (
        <div className="flex justify-center h-full p-4">
            <form
                className="flex flex-col space-y-5 w-1/3 min-w-fit"
                onSubmit={handleSubmit}
            >
                <h2 className="font-bold text-xl text-center">
                    Create Teller Account
                </h2>

                {submissionError && <ErrorAlert error={submissionError} />}

                <label htmlFor="new_teller_first_name">First Name</label>
                <input
                    type="text"
                    id="new_teller_first_name"
                    name="first_name"
                    value={formValues.first_name}
                    onChange={handleChange}
                    className="rounded-md border text-lg p-1"
                />

                <label htmlFor="new_teller_last_name">Last Name</label>
                <input
                    type="text"
                    id="new_teller_last_name"
                    name="last_name"
                    value={formValues.last_name}
                    onChange={handleChange}
                    className="rounded-md border text-lg p-1"
                />

                <label htmlFor="new_teller_email">Email</label>
                <input
                    type="email"
                    id="new_teller_email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    className="rounded-md border text-lg p-1"
                />

                <label htmlFor="new_teller_phone">Phone</label>
                <input
                    type="text"
                    id="new_teller_phone"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                    className="rounded-md border text-lg p-1"
                />

                <label htmlFor="new_teller_password">Password</label>
                <input
                    type="password"
                    id="new_teller_password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    className="rounded-md border text-lg p-1"
                />

                <label htmlFor="new_teller_dob">Date of Birth</label>
                <input
                    type="date"
                    id="new_teller_dob"
                    name="dob"
                    value={formValues.dob}
                    onChange={handleChange}
                    className="rounded-md border text-lg p-1"
                />

                <label htmlFor="new_teller_address">Address</label>
                <input
                    type="text"
                    id="new_teller_address"
                    name="address"
                    value={formValues.address}
                    onChange={handleChange}
                    className="rounded-md border text-lg p-1"
                />

                <label htmlFor="new_teller_branch">Branch</label>
                <select
                    id="new_teller_branch"
                    name="branch_id"
                    value={formValues.branch_id}
                    onChange={handleChange}
                    className="rounded-md border text-lg p-1"
                >
                    {branches.map((branchItem) => (
                        <option
                            key={branchItem.branch_id}
                            value={branchItem.branch_id}
                        >
                            {branchItem.branch_name}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md w-fit p-2 self-end"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default CreateTeller;
