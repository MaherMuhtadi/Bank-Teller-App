function BackgroundInformation({
    formValues,
    setFormValues,
    residency,
    identification,
}) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <div className="space-y-5">
            <h3 className="font-semibold text-lg">Background Information</h3>

            <div className="flex justify-between space-x-6">
                <div className="flex flex-col space-y-5 w-1/2">
                    <label htmlFor="registration_occupation">Occupation</label>
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
                        value={formValues.client_identification_document_type}
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
                        value={formValues.client_identification_document_number}
                        onChange={handleChange}
                        className="rounded-md border text-lg p-1"
                    />
                </div>
            </div>

            <div className="flex justify-between space-x-6">
                <div className="flex flex-col space-y-5 w-1/2">
                    <label htmlFor="registration_address">Street Address</label>
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
        </div>
    );
}

export default BackgroundInformation;
