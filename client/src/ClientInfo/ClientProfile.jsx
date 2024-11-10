function ClientProfile({ client }) {
    const branch = {
        101: "2 Harwood Ave S, Ajax",
        102: "43 Conlin Rd E, Oshawa",
        103: "714 Rossland Rd E, Whitby",
    };
    const product = { 801: "Chequing", 802: "Savings" };

    return (
        <div className="flex justify-center p-4">
            <div className="flex flex-col space-y-6 w-1/2 bg-neutral-50 p-4 rounded-xl">
                <h2 className="font-bold text-center">Client Profile</h2>
                <h3 className="font-bold italic">Profile Information</h3>
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

                <h3 className="font-bold italic">Background Information</h3>
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
                <div>
                    <h3 className="font-bold italic">Nominee Information</h3>
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

                <div>
                    <h3 className="font-bold italic">Account Information</h3>
                    <p>
                        <span className="font-bold">Branch:</span>{" "}
                        {branch[client.branch_id]}
                    </p>
                    <p>
                        <span className="font-bold">Product:</span>{" "}
                        {client.product_id}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ClientProfile;
