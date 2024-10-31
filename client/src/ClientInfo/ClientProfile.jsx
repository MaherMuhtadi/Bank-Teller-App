function ClientProfile({ client }) {
    return (
        <div className="flex justify-center p-4">
            <div className="w-1/2 bg-neutral-50 p-4 rounded-xl">
                <h2 className="font-bold text-center">Client Profile</h2>
                <p>
                    <strong>First Name:</strong> {client.firstname}
                </p>
                <p>
                    <strong>Last Name:</strong> {client.lastname}
                </p>
                <p>
                    <strong>Occupation:</strong> {client.occupation}
                </p>
                <p>
                    <strong>Date of Birth:</strong> {client.dob}
                </p>
                <p>
                    <strong>Residency:</strong> {client.residency}
                </p>
                <p>
                    <strong>Address:</strong> {client.address}
                </p>
                <p>
                    <strong>Email:</strong> {client.email}
                </p>
                <p>
                    <strong>Password:</strong> {client.password}
                </p>
                <p>
                    <strong>Phone:</strong> {client.phone}
                </p>
                <p>
                    <strong>Nominee:</strong> {client.nominee}
                </p>
                <p>
                    <strong>Branch:</strong> {client.branch}
                </p>
                <p>
                    <strong>Account Type:</strong> {client.account_type}
                </p>
            </div>
        </div>
    );
}

export default ClientProfile;
