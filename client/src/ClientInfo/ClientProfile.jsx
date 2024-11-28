import { useState, useEffect } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import ErrorAlert from "../Components/ErrorAlert";

function ClientProfile({ client }) {
    const apiUrl = "http://127.0.0.1:8000/account/";
    const [branchesLoading, setBranchesLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

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
            throw new Error(error.message);
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

    if (branchesLoading) {
        return <LoadingSpinner />; // Show loading message while data is being fetched
    }

    if (fetchError) {
        return <ErrorAlert error={fetchError} />; // Display any error that occurs
    }

    return (
        <div className="flex flex-col space-y-6 w-1/3 bg-neutral-50 p-4 rounded-xl shadow-md">
            <h2 className="font-bold text-xl text-center">Client Profile</h2>
            <h3 className="font-semibold text-lg">Profile Information</h3>
            <div>
                <p>
                    <span className="font-semibold">Client ID:</span>{" "}
                    {client.client_id}
                </p>
                <p>
                    <span className="font-semibold">First Name:</span>{" "}
                    {client.first_name}
                </p>
                <p>
                    <span className="font-semibold">Last Name:</span>{" "}
                    {client.last_name}
                </p>
                <p>
                    <span className="font-semibold">Email:</span> {client.email}
                </p>
                <p>
                    <span className="font-semibold">Phone:</span> {client.phone}
                </p>
                <p>
                    <span className="font-semibold">Date of Birth:</span>{" "}
                    {client.dob}
                </p>
                <p>
                    <span className="font-semibold">Branch:</span>{" "}
                    {
                        branches.find((b) => b.branch_id === client.branch_id)
                            .branch_name
                    }
                </p>
            </div>

            <h3 className="font-semibold text-lg">Background Information</h3>
            <div>
                <p>
                    <span className="font-semibold">Occupation:</span>{" "}
                    {client.occupation}
                </p>
                <p>
                    <span className="font-semibold">Residency:</span>{" "}
                    {client.residency}
                </p>
                <p>
                    <span className="font-semibold">Government ID Type:</span>{" "}
                    {client.client_identification_document_type}
                </p>
                <p>
                    <span className="font-semibold">Government ID Number:</span>{" "}
                    {client.client_identification_document_number}
                </p>
                <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {client.address}
                </p>
            </div>

            <h3 className="font-semibold text-lg">Nominee Information</h3>
            <div>
                <p>
                    <span className="font-semibold">Nominee:</span>{" "}
                    {client.nominee_name}
                </p>
                <p>
                    <span className="font-semibold">Nominee Relationship:</span>{" "}
                    {client.nominee_relation}
                </p>
                <p>
                    <span className="font-semibold">
                        Nominee Government ID Type:
                    </span>{" "}
                    {client.nominee_identification_document_type}
                </p>
                <p>
                    <span className="font-semibold">
                        Nominee Government ID Number:
                    </span>{" "}
                    {client.nominee_identification_document_number}
                </p>
            </div>
        </div>
    );
}

export default ClientProfile;
