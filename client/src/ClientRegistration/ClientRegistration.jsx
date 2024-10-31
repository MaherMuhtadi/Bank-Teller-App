import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ClientRegistration() {
    const residency = [
        "Citizen",
        "Permanent Resident",
        "Foreign Worker",
        "Foreign Student",
    ];
    const branch = [
        "2 Harwood Ave S, Ajax",
        "43 Conlin Rd E, Oshawa",
        "714 Rossland Rd E, Whitby",
    ];
    const accountType = ["Chequing", "Savings"];
    const [formValues, setFormValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        occupation: "",
        dob: "",
        residency: residency[0],
        address: "",
        city: "",
        province: "",
        zip: "",
        nominee: "",
        branch: branch[0],
        account_type: accountType[0],
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let address = `${formValues.address}, ${formValues.city}, ${formValues.province}, ${formValues.zip}`;
        let client = {
            firstname: formValues.firstname,
            lastname: formValues.lastname,
            occupation: formValues.occupation,
            dob: formValues.dob,
            residency: formValues.residency,
            address: address,
            email: formValues.email,
            password: formValues.password,
            phone: formValues.phone,
            nominee: formValues.nominee,
            branch: formValues.branch,
            account_type: formValues.account_type,
        };
        navigate("/client_info", { state: { client } });
    };

    return (
        <div className="flex justify-center h-full p-4">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-5 w-1/3 min-w-fit"
            >
                <h2 className="font-bold text-center">New Client</h2>

                <div className="flex justify-between space-x-6">
                    <div className="flex flex-col space-y-5 w-1/2">
                        <label htmlFor="registration_first_name">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="registration_first_name"
                            name="firstname"
                            value={formValues.firstname}
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
                            name="lastname"
                            value={formValues.lastname}
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
                </div>

                <div className="flex justify-between space-x-6">
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

                <div className="flex flex-col space-y-5">
                    <label htmlFor="registration_nominee">Nominee</label>
                    <input
                        type="text"
                        id="registration_nominee"
                        name="nominee"
                        value={formValues.nominee}
                        onChange={handleChange}
                        className="rounded-md border text-lg p-1"
                    />
                </div>

                <div className="flex flex-col space-y-5">
                    <label htmlFor="registration_branch">Branch</label>
                    <select
                        id="registration_branch"
                        name="branch"
                        value={formValues.branch}
                        onChange={handleChange}
                        className="rounded-md border text-lg p-1"
                    >
                        {branch.map((branch, index) => (
                            <option key={index} value={branch}>
                                {branch}
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
                        name="account_type"
                        value={formValues.account_type}
                        onChange={handleChange}
                        className="rounded-md border text-lg p-1"
                    >
                        {accountType.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
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
