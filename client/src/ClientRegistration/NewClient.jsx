function NewClient() {
    return (
        <form className="flex flex-col space-y-5 min-w-fit">
            <h2 className="font-bold text-center">New Client</h2>
            <div className="flex space-x-6">
                <div className="flex flex-col space-y-5">
                    <label htmlFor="name">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        className="rounded-md border text-lg p-1"
                    />
                </div>
                <div className="flex flex-col space-y-5">
                    <label htmlFor="name">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
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
                        className="rounded-md border text-lg p-1"
                    />
                </div>
                <div className="flex flex-col space-y-5">
                    <label htmlFor="occupation">Occupation</label>
                    <input
                        type="text"
                        id="occupation"
                        name="occupation"
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
                        className="rounded-md border text-lg p-1"
                    />
                </div>
                <div className="flex flex-col space-y-5">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
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
                        className="rounded-md border text-lg p-1"
                    />
                </div>
                <div className="flex flex-col space-y-5">
                    <label htmlFor="zip">Postal Code</label>
                    <input
                        type="text"
                        id="zip"
                        name="zip"
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
                    className="rounded-md border text-lg p-1"
                />
            </div>
            <div className="flex flex-col space-y-5">
                <label htmlFor="branch">Branch</label>
                <select
                    id="branch"
                    name="branch"
                    className="rounded-md border text-lg p-1"
                >
                    <option selected value="2 Harwood Ave S, Ajax">
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
                <label htmlFor="account_type">Account Type</label>
                <select
                    id="account_type"
                    name="account_type"
                    className="rounded-md border text-lg p-1"
                >
                    <option selected value="chequing">
                        Chequing
                    </option>
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
