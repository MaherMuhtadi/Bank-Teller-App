function NomineeInformation({
    formValues,
    setFormValues,
    handleNominee,
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
            <h3 className="font-semibold text-lg">Nominee Information</h3>

            <label htmlFor="registration_nominee" className="flex space-x-6">
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
                        <label htmlFor="registration_nominee_name">Name</label>
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
                            <option value="">Select a type</option>
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
        </div>
    );
}

export default NomineeInformation;
