import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewAccount() {
    const [formValues, setFormValues] = useState({
        client: "",
        account_type: "chequing",
        branch: "2 Harwood Ave S, Ajax",
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
        console.log("Form Values:", formValues);
        navigate("/client_info", { state: { formValues } });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5 w-1/3">
            <h2 className="font-bold text-center">New Account</h2>

            <label htmlFor="client">Client No.</label>
            <input
                type="text"
                id="client"
                name="client"
                value={formValues.client}
                onChange={handleChange}
                className="rounded-md border text-lg p-1"
            />

            <label htmlFor="account_type">Account Type</label>
            <select
                id="account_type"
                name="account_type"
                value={formValues.account_type}
                onChange={handleChange}
                className="rounded-md border text-lg p-1"
            >
                <option value="chequing">Chequing</option>
                <option value="savings">Savings</option>
            </select>

            <label htmlFor="branch">Branch</label>
            <select
                id="branch"
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

            <button
                type="submit"
                className="bg-green-500 rounded-md w-fit p-2 self-end"
            >
                Submit
            </button>
        </form>
    );
}

export default NewAccount;
