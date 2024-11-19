import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../Components/LoadingAnimation";
import ProfileInformation from "./ProfileInformation";
import BackgroundInformation from "./BackgroundInformation";
import NomineeInformation from "./NomineeInformation";
import AccountInformation from "./AccountInformation";
import ErrorAlert from "../Components/ErrorAlert";

function ClientRegistration() {
    const apiUrl = "http://127.0.0.1:8000/account/";
    const [branchesLoading, setBranchesLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [submissionError, setSubmissionError] = useState(null);

    const residency = [
        "Citizen",
        "Permanent Resident",
        "Foreign Worker",
        "Foreign Student",
    ];
    const identification = ["Passport", "Driver's License", "Health Card"];
    const [formValues, setFormValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        occupation: "",
        dob: "",
        client_identification_document_type: identification[0],
        client_identification_document_number: "",
        residency: residency[0],
        address: "",
        city: "",
        province: "",
        zip: "",
        nominee_name: "",
        nominee_relation: "",
        nominee_identification_document_type: "",
        nominee_identification_document_number: "",
        branch_id: "", // Set once branches are loaded
        product_id: "", // Set once products are loaded
    });
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

    async function getProducts() {
        try {
            const response = await fetch(apiUrl + "get_product_list/", {
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
            setProducts(data);
        } catch (error) {
            throw new Error(error.message); // Rethrow the error so it can be handled by the caller
        } finally {
            setProductsLoading(false); // Set loading to false once done
        }
    }

    useEffect(() => {
        try {
            getBranches();
            getProducts();
        } catch (error) {
            setFetchError(error.message);
        }
    }, []); // Empty dependency array to run only once when the component mounts

    // Update branch_id once branches are loaded
    useEffect(() => {
        if (branches.length > 0) {
            setFormValues((prevValues) => ({
                ...prevValues,
                branch_id: branches[0].branch_id,
            }));
        }
    }, [branches]); // Run only when branches are updated

    // Update product_id once products are loaded
    useEffect(() => {
        if (products.length > 0) {
            setFormValues((prevValues) => ({
                ...prevValues,
                product_id: products[0].product_id,
            }));
        }
    }, [products]); // Run only when products are updated

    const navigate = useNavigate();

    const handleNominee = (e) => {
        if (e.target.checked) {
            document.getElementById("nominee_fields").className =
                "flex flex-col space-y-5";
        } else {
            document.getElementById("nominee_fields").className = "hidden";
        }
    };

    const createNewClient = async (clientData) => {
        try {
            const response = await fetch(apiUrl + "create_new_client/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(clientData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || response.statusText);
            }

            const data = await response.json();
            return data.client_id;
        } catch (error) {
            throw new Error(error.message); // Rethrow the error so it can be handled by the caller
        }
    };

    const createNewAccount = async (accountData) => {
        try {
            const response = await fetch(apiUrl + "create_new_account/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(accountData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || response.statusText);
            }

            const data = await response.json();
            return data.account_id;
        } catch (error) {
            throw new Error(error.message); // Rethrow the error so it can be handled by the caller
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let address = `${formValues.address}, ${formValues.city}, ${formValues.province}, ${formValues.zip}`;
        let client = {
            first_name: formValues.first_name,
            last_name: formValues.last_name,
            email: formValues.email,
            phone: formValues.phone,
            password: formValues.password,
            dob: formValues.dob,
            client_identification_document_type:
                formValues.client_identification_document_type,
            client_identification_document_number:
                formValues.client_identification_document_number,
            residency: formValues.residency,
            address: address,
            occupation: formValues.occupation,
            nominee_name: formValues.nominee_name,
            nominee_identification_document_type:
                formValues.nominee_identification_document_type,
            nominee_identification_document_number:
                formValues.nominee_identification_document_number,
            nominee_relation: formValues.nominee_relation,
            branch_id: formValues.branch_id,
        };
        try {
            let client_id = await createNewClient(client);
            let account = {
                client_id: client_id,
                product_id: formValues.product_id,
            };
            await createNewAccount(account);
            navigate("/client_info", {
                state: {
                    client: {
                        ...client,
                        client_id: client_id,
                    },
                },
            });
        } catch (error) {
            setSubmissionError(error.message);
        }
    };

    if (branchesLoading || productsLoading) {
        return <LoadingAnimation />; // Show loading message while data is being fetched
    }

    if (fetchError) {
        return <ErrorAlert error={fetchError} />; // Show error message if data fetching fails
    }

    return (
        <div className="flex justify-center h-full p-4">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-5 w-1/3 min-w-fit"
            >
                <h2 className="font-bold text-xl text-center">New Client</h2>

                {submissionError && <ErrorAlert error={submissionError} />}

                <ProfileInformation
                    formValues={formValues}
                    setFormValues={setFormValues}
                />

                <BackgroundInformation
                    formValues={formValues}
                    setFormValues={setFormValues}
                    residency={residency}
                    identification={identification}
                />

                <NomineeInformation
                    formValues={formValues}
                    setFormValues={setFormValues}
                    handleNominee={handleNominee}
                    identification={identification}
                />

                <AccountInformation
                    formValues={formValues}
                    setFormValues={setFormValues}
                    branches={branches}
                    products={products}
                />

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

export default ClientRegistration;
