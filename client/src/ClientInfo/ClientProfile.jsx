import { useState, useEffect } from "react";

function ClientProfile({ client }) {
    const apiUrl = "http://127.0.0.1:8000/account/";
    const [branchesLoading, setBranchesLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [branches, setBranches] = useState([]);
    const [products, setProducts] = useState([]);

    async function getBranches() {
        try {
            const response = await fetch(apiUrl + "get_branch_list/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setBranches(data);
        } catch (error) {
            setError(error.message); // Set error if any occurs
            console.error("Error fetching branches:", error);
        } finally {
            setBranchesLoading(false); // Set loading to false once done
        }
    }

    async function getProducts() {
        try {
            const response = await fetch(apiUrl + "get_product_list/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            setError(error.message); // Set error if any occurs
            console.error("Error fetching products:", error);
        } finally {
            setProductsLoading(false); // Set loading to false once done
        }
    }

    useEffect(() => {
        getBranches();
        getProducts();
    }, []); // Empty dependency array to run only once when the component mounts

    if (branchesLoading || productsLoading) {
        return <div className="flex justify-center">Loading...</div>; // Show loading message while data is being fetched
    }

    if (error) {
        return <div className="flex justify-center">Error: {error}</div>; // Display any error that occurs
    }

    return (
        <div className="flex justify-center p-4">
            <div className="flex flex-col space-y-6 w-1/2 bg-neutral-50 p-4 rounded-xl">
                <h2 className="font-bold text-xl text-center">
                    Client Profile
                </h2>
                <h3 className="font-bold text-lg italic">
                    Profile Information
                </h3>
                <div>
                    <p>
                        <span className="font-bold">Client ID:</span>{" "}
                        {client.client_id}
                    </p>
                    <p>
                        <span className="font-bold">First Name:</span>{" "}
                        {client.first_name}
                    </p>
                    <p>
                        <span className="font-bold">Last Name:</span>{" "}
                        {client.last_name}
                    </p>
                    <p>
                        <span className="font-bold">Email:</span> {client.email}
                    </p>
                    <p>
                        <span className="font-bold">Password:</span>{" "}
                        {client.password}
                    </p>
                    <p>
                        <span className="font-bold">Phone:</span> {client.phone}
                    </p>
                    <p>
                        <span className="font-bold">Date of Birth:</span>{" "}
                        {client.dob}
                    </p>
                </div>

                <h3 className="font-bold text-lg italic">
                    Background Information
                </h3>
                <div>
                    <p>
                        <span className="font-bold">Occupation:</span>{" "}
                        {client.occupation}
                    </p>
                    <p>
                        <span className="font-bold">Residency:</span>{" "}
                        {client.residency}
                    </p>
                    <p>
                        <span className="font-bold">Government ID Type:</span>{" "}
                        {client.client_identification_document_type}
                    </p>
                    <p>
                        <span className="font-bold">Government ID Number:</span>{" "}
                        {client.client_identification_document_number}
                    </p>
                    <p>
                        <span className="font-bold">Address:</span>{" "}
                        {client.address}
                    </p>
                </div>

                <h3 className="font-bold text-lg italic">
                    Nominee Information
                </h3>
                <div>
                    <p>
                        <span className="font-bold">Nominee:</span>{" "}
                        {client.nominee_name}
                    </p>
                    <p>
                        <span className="font-bold">Nominee Relationship:</span>{" "}
                        {client.nominee_relation}
                    </p>
                    <p>
                        <span className="font-bold">
                            Nominee Government ID Type:
                        </span>{" "}
                        {client.nominee_identification_document_type}
                    </p>
                    <p>
                        <span className="font-bold">
                            Nominee Government ID Number:
                        </span>{" "}
                        {client.nominee_identification_document_number}
                    </p>
                </div>

                <h3 className="font-bold text-lg italic">
                    Account Information
                </h3>
                <div>
                    <p>
                        <span className="font-bold">Branch:</span>{" "}
                        {
                            branches.find(
                                (b) => b.branch_id === client.branch_id
                            ).branch_name
                        }
                    </p>
                    <p>
                        <span className="font-bold">Product:</span>{" "}
                        {
                            products.find(
                                (p) => p.product_id === client.product_id
                            ).product_name
                        }
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ClientProfile;
