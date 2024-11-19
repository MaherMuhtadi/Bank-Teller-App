function ProfileInformation({ formValues, setFormValues }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <div className="space-y-5">
            <h3 className="font-bold text-lg italic">Profile Information</h3>

            <div className="flex justify-between space-x-6">
                <div className="flex flex-col space-y-5 w-1/2">
                    <label htmlFor="registration_first_name">First Name</label>
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
                    <label htmlFor="registration_last_name">Last Name</label>
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
        </div>
    );
}

export default ProfileInformation;
