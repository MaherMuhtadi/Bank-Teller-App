import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewClient() {
    const [formValues, setFormValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        occupation: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        nominee: "",
        branch: "2 Harwood Ave S, Ajax",
        account_type: "chequing",
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
        let address = `${formValues.address}, ${formValues.city}, ${formValues.state}, ${formValues.zip}`;
        let client = {
            firstname: formValues.firstname,
            lastname: formValues.lastname,
            occupation: formValues.occupation,
            address: address,
            email: formValues.email,
            phone: formValues.phone,
            nominee: formValues.nominee,
        };
        console.log("Form Values:", client);
        navigate("/client_info", { state: { client } });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5 w-fit">
            <h2 className="font-bold text-center">New Client</h2>

            <div className="flex space-x-6">
                <div className="flex flex-col space-y-5">
                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name="firstname"
                        value={formValues.first_name}
                        onChange={handleChange}
                        className="rounded-md border text-lg p-1"
                    />
                </div>
                <div className="flex flex-col space-y-5">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        name="lastname"
                        value={formValues.last_name}
                        onChange={handleChange}
                        className="rounded-md border text-lg p-1"
                    />
                </div>
            </div>

            <div className="flex flex-col space-y-5">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    className="rounded-md border text-lg p-1"
                />
            </div>

            <div className="flex space-x-6">
                <div className="flex flex-col space-y-5">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formValues.phone}
                        onChange={handleChange}
                        className="rounded-md border text-lg p-1"
                    />
                </div>
                <div className="flex flex-col space-y-5">
                    <label htmlFor="occupation">Occupation</label>
                    <input
                        type="text"
                        id="occupation"
                        name="occupation"
                        value={formValues.occupation}
                        onChange={handleChange}
                        className="rounded-md border text-lg p-1"
                    />
                </div>
            </div>

            <div className="flex space-x-6">
                <div className="flex flex-col space-y-5">
                    <label htmlFor="address">Street Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formValues.address}
                        onChange={handleChange}
                        className="rounded-md border text-lg p-1"
                    />
                </div>
                <div className="flex flex-col space-y-5">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formValues.city}
                        onChange={handleChange}
                        className="rounded-md border text-lg p-1"
                    />
                </div>
            </div>

            <div className="flex space-x-6">
                <div className="flex flex-col space-y-5">
                    <label htmlFor="state">State</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formValues.state}
                        onChange={handleChange}
                        className="rounded-md border text-lg p-1"
                    />
                </div>
                <div className="flex flex-col space-y-5">
                    <label htmlFor="zip">Postal Code</label>
                    <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={formValues.zip}
                        onChange={handleChange}
                        className="rounded-md border text-lg p-1"
                    />
                </div>
            </div>

            <div className="flex flex-col space-y-5">
                <label htmlFor="nominee">Nominee</label>
                <input
                    type="text"
                    id="nominee"
                    name="nominee"
                    value={formValues.nominee}
                    onChange={handleChange}
                    className="rounded-md border text-lg p-1"
                />
            </div>

            <div className="flex flex-col space-y-5">
                <label htmlFor="branch1">Branch</label>
                <select
                    id="branch1"
                    name="branch"
                    value={formValues.branch}
                    onChange={handleChange}
                    className="rounded-md border text-lg p-1"
                >
                    <option value="2 Harwood Ave S, Ajax">
                        2 Harwood Ave S, Ajax
                    </option>
                    <option value="43 Conlin Rd E, Oshawa">
                        43 Conlin Rd E, Oshawa
                    </option>
                    <option value="714 Rossland Rd E, Whitby">
                        714 Rossland Rd E, Whitby
                    </option>
                </select>
            </div>

            <div className="flex flex-col space-y-5">
                <label htmlFor="account_type1">Account Type</label>
                <select
                    id="account_type1"
                    name="account_type"
                    value={formValues.account_type}
                    onChange={handleChange}
                    className="rounded-md border text-lg p-1"
                >
                    <option value="chequing">Chequing</option>
                    <option value="savings">Savings</option>
                </select>
            </div>

            <button
                type="submit"
                className="bg-green-500 rounded-md w-fit p-2 self-end"
            >
                Submit
            </button>
        </form>
    );
}

export default NewClient;
