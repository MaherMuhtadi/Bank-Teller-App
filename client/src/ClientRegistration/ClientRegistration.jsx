import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ClientRegistration() {
    const apiUrl = "http://127.0.0.1:8000/account/";
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const residency = [
        "Citizen",
        "Permanent Resident",
        "Foreign Worker",
        "Foreign Student",
    ];
    const identification = ["Passport", "Driver's License", "Health Card"];
    const product = { 801: "Chequing", 802: "Savings" };
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
        product_id: Object.keys(product)[0],
    });
    const [branches, setBranches] = useState([]);

    useEffect(() => {
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
                setLoading(false); // Set loading to false once done
            }
        }

        getBranches(); // Call the function on component mount
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

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleNominee = (e) => {
        if (e.target.checked) {
            document.getElementById("nominee_fields").className =
                "flex flex-col space-y-5";
        } else {
            document.getElementById("nominee_fields").className = "hidden";
        }
    };

    const handleSubmit = (e) => {
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
            product_id: formValues.product_id,
        };
        client.client_id = Math.floor(Math.random() * 10000000000).toString();
        navigate("/client_info", { state: { client } });
    };

    if (loading) {
        return <div className="flex justify-center">Loading...</div>; // Show loading message while data is being fetched
    }

    if (error) {
        return <div className="flex justify-center">Error: {error}</div>; // Display any error that occurs
    }

    return (
        <div className="flex justify-center h-full p-4">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-5 w-1/3 min-w-fit"
            >
                <h2 className="font-bold text-xl text-center">New Client</h2>

                <h3 className="font-bold text-lg italic">
                    Profile Information
                </h3>

                <div className="flex justify-between space-x-6">
                    <div className="flex flex-col space-y-5 w-1/2">
                        <label htmlFor="registration_first_name">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="registration_first_name"
                            name="first_name"
                            value={formValues.first_name}
                            onChange={handleChange}
                            className="rounded-md border text-lg p-1"
                        />
                    </div>
                    <div className="flex flex-col space-y-5 w-1/2">
                        <label htmlFor="registration_last_name">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="registration_last_name"
                            name="last_name"
                            value={formValues.last_name}
                            onChange={handleChange}
                            className="rounded-md border text-lg p-1"
                        />
                    </div>
                </div>

                <div className="flex flex-col space-y-5">
                    <label htmlFor="registration_email">Email</label>
                    <input
                        type="email"
                        id="registration_email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        className="rounded-md border text-lg p-1"
                    />
                </div>

                <div className="flex flex-col space-y-5">
                    <label htmlFor="registration_password">Password</label>
                    <input
                        type="password"
                        id="registration_password"
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
                        className="rounded-md border text-lg p-1"
                    />
                </div>

                <div className="flex justify-between space-x-6">
                    <div className="flex flex-col space-y-5 w-1/2">
                        <label htmlFor="registration_phone">Phone</label>
                        <input
                            type="tel"
                            id="registration_phone"
                            name="phone"
                            value={formValues.phone}
                            onChange={handleChange}
                            className="rounded-md border text-lg p-1"
                        />
                    </div>
                    <div className="flex flex-col space-y-5 w-1/2">
                        <label htmlFor="registration_dob">Date of Birth</label>
                        <input
                            type="date"
                            id="registration_dob"
                            name="dob"
                            value={formValues.dob}
                            onChange={handleChange}
                            className="rounded-md border text-lg p-1"
                        />
                    </div>
                </div>

                <h3 className="font-bold text-lg italic">
                    Background Information
                </h3>

                <div className="flex justify-between space-x-6">
                    <div className="flex flex-col space-y-5 w-1/2">
                        <label htmlFor="registration_occupation">
                            Occupation
                        </label>
                        <input
                            type="text"
                            id="registration_occupation"
                            name="occupation"
                            value={formValues.occupation}
                            onChange={handleChange}
                            className="rounded-md border text-lg p-1"
                        />
                    </div>
                    <div className="flex flex-col space-y-5 w-1/2">
                        <label htmlFor="registration_residency">
                            Residency Status
                        </label>
                        <select
                            id="registration_residency"
                            name="residency"
                            value={formValues.residency}
                            onChange={handleChange}
                            className="rounded-md border text-lg p-1"
                        >
                            {residency.map((status, index) => (
                                <option key={index} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-between space-x-6">
                    <div className="flex flex-col space-y-5 w-1/2">
                        <label htmlFor="registration_client_identification_document_type">
                            Government ID Type
                        </label>
                        <select
                            id="registration_client_identification_document_type"
                            name="client_identification_document_type"
                            value={
                                formValues.client_identification_document_type
                            }
                            onChange={handleChange}
                            className="rounded-md border text-lg p-1"
                        >
                            {identification.map((document, index) => (
                                <option key={index} value={document}>
                                    {document}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col space-y-5 w-1/2">
                        <label htmlFor="registration_client_identification_document_number">
                            Government ID Number
                        </label>
                        <input
                            type="text"
                            id="registration_client_identification_document_number"
                            name="client_identification_document_number"
                            value={
                                formValues.client_identification_document_number
                            }
                            onChange={handleChange}
                            className="rounded-md border text-lg p-1"
                        />
                    </div>
                </div>

                <div className="flex justify-between space-x-6">
                    <div className="flex flex-col space-y-5 w-1/2">
                        <label htmlFor="registration_address">
                            Street Address
                        </label>
                        <input
                            type="text"
                            id="registration_address"
                            name="address"
                            value={formValues.address}
                            onChange={handleChange}
                            className="rounded-md border text-lg p-1"
                        />
                    </div>
                    <div className="flex flex-col space-y-5 w-1/2">
                        <label htmlFor="registration_city">City</label>
                        <input
                            type="text"
                            id="registration_city"
                            name="city"
                            value={formValues.city}
                            onChange={handleChange}
                            className="rounded-md border text-lg p-1"
                        />
                    </div>
                </div>

                <div className="flex justify-between space-x-6">
                    <div className="flex flex-col space-y-5 w-1/2">
                        <label htmlFor="registration_province">Province</label>
                        <input
                            type="text"
                            id="registration_province"
                            name="province"
                            value={formValues.province}
                            onChange={handleChange}
                            className="rounded-md border text-lg p-1"
                        />
                    </div>
                    <div className="flex flex-col space-y-5 w-1/2">
                        <label htmlFor="registration_zip">Postal Code</label>
                        <input
                            type="text"
                            id="registration_zip"
                            name="zip"
                            value={formValues.zip}
                            onChange={handleChange}
                            className="rounded-md border text-lg p-1"
                        />
                    </div>
                </div>

                <h3 className="font-bold text-lg italic">
                    Nominee Information
                </h3>
                <label
                    htmlFor="registration_nominee"
                    className="flex space-x-6"
                >
                    <p>Add Nominee</p>
                    <input
                        type="checkbox"
                        id="registration_nominee"
                        onClick={handleNominee}
                    />
                </label>

                <div id="nominee_fields" className="hidden">
                    <div className="flex justify-between space-x-6">
                        <div className="flex flex-col space-y-5 w-1/2">
                            <label htmlFor="registration_nominee_name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="registration_nominee_name"
                                name="nominee_name"
                                value={formValues.nominee_name}
                                onChange={handleChange}
                                className="rounded-md border text-lg p-1"
                            />
                        </div>
                        <div className="flex flex-col space-y-5 w-1/2">
                            <label htmlFor="registration_nominee_relation">
                                Relationship
                            </label>
                            <input
                                type="text"
                                id="registration_nominee_relation"
                                name="nominee_relation"
                                value={formValues.nominee_relation}
                                onChange={handleChange}
                                className="rounded-md border text-lg p-1"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between space-x-6">
                        <div className="flex flex-col space-y-5 w-1/2">
                            <label htmlFor="registration_nominee_identification_document_type">
                                Government ID Type
                            </label>
                            <select
                                id="registration_nominee_identification_document_type"
                                name="nominee_identification_document_type"
                                value={
                                    formValues.nominee_identification_document_type
                                }
                                onChange={handleChange}
                                className="rounded-md border text-lg p-1"
                            >
                                <option value="" />
                                {identification.map((document, index) => (
                                    <option key={index} value={document}>
                                        {document}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col space-y-5 w-1/2">
                            <label htmlFor="registration_nominee_identification_document_number">
                                Government ID Number
                            </label>
                            <input
                                type="text"
                                id="registration_nominee_identification_document_number"
                                name="nominee_identification_document_number"
                                value={
                                    formValues.nominee_identification_document_number
                                }
                                onChange={handleChange}
                                className="rounded-md border text-lg p-1"
                            />
                        </div>
                    </div>
                </div>

                <h3 className="font-bold text-lg italic">
                    Account Information
                </h3>

                <div className="flex flex-col space-y-5">
                    <label htmlFor="registration_branch">Branch</label>
                    <select
                        id="registration_branch"
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
                </div>

                <div className="flex flex-col space-y-5">
                    <label htmlFor="registration_account_type">
                        Account Type
                    </label>
                    <select
                        id="registration_account_type"
                        name="product_id"
                        value={formValues.product_id}
                        onChange={handleChange}
                        className="rounded-md border text-lg p-1"
                    >
                        {Object.entries(product).map(
                            ([product_id, product_name]) => (
                                <option key={product_id} value={product_id}>
                                    {product_name}
                                </option>
                            )
                        )}
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-green-500 rounded-md w-fit p-2 self-end"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ClientRegistration;
