function AccountInformation({ formValues, setFormValues, branches, products }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <div className="space-y-5">
            <h3 className="font-semibold text-lg">Account Information</h3>
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
                <label htmlFor="registration_account_type">Account Type</label>
                <select
                    id="registration_account_type"
                    name="product_id"
                    value={formValues.product_id}
                    onChange={handleChange}
                    className="rounded-md border text-lg p-1"
                >
                    {products.map((productItem) => (
                        <option
                            key={productItem.product_id}
                            value={productItem.product_id}
                        >
                            {productItem.product_name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default AccountInformation;
