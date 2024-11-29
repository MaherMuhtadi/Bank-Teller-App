import { useState, useEffect } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import ErrorAlert from "../Components/ErrorAlert";

function Colleagues() {
    const apiUrl = "http://127.0.0.1:8000/account/";
    const [colleaguesLoading, setColleaguesLoading] = useState(true);
    const [branchesLoading, setBranchesLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    const [colleagues, setColleagues] = useState([]);
    const [branches, setBranches] = useState([]);
    const employeeId = sessionStorage.getItem("employee_id");

    async function getColleagues() {
        try {
            const response = await fetch(apiUrl + "employeeList/", {
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
            setColleagues(data);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            setColleaguesLoading(false);
        }
    }

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
            throw new Error(error.message);
        } finally {
            setBranchesLoading(false); // Set loading to false once done
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([getBranches(), getColleagues()]);
                // Remove the current employee from the list
                setColleagues((prevColleagues) =>
                    prevColleagues.filter(
                        (colleague) => colleague.employee_id !== employeeId
                    )
                );
            } catch (error) {
                setFetchError(error.message);
            }
        };
        fetchData();
    }, []); // Run only once when the component mounts

    if (colleaguesLoading || branchesLoading) {
        return <LoadingSpinner />;
    }

    if (fetchError) {
        return <ErrorAlert error={fetchError} />;
    }

    return (
        <div className="p-4 space-y-5">
            <h2 className="font-bold text-xl text-center">Colleagues</h2>
            {branches.map((branch) => {
                const branchColleagues = colleagues.filter(
                    (colleague) => colleague.branch_id === branch.branch_id
                );

                return (
                    <div
                        key={branch.branch_id}
                        className="flex flex-col space-y-5"
                    >
                        <div>
                            <h3 className="font-semibold text-lg">
                                {branch.branch_name}
                            </h3>
                            <p>{branch.branch_location}</p>
                        </div>
                        {branchColleagues.length > 0 ? (
                            <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {branchColleagues.map((colleague) => (
                                    <li
                                        key={colleague.employee_id}
                                        className="flex flex-col bg-neutral-50 p-4 rounded-xl shadow-md space-y-5"
                                    >
                                        <span className="font-semibold text-center">
                                            {colleague.first_name}{" "}
                                            {colleague.last_name}
                                        </span>
                                        <div>
                                            <span className="font-semibold">
                                                Email:
                                            </span>{" "}
                                            {colleague.email}
                                        </div>
                                        <div>
                                            <span className="font-semibold">
                                                Phone Number:
                                            </span>{" "}
                                            {colleague.phone}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No colleagues in this branch.</p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default Colleagues;
