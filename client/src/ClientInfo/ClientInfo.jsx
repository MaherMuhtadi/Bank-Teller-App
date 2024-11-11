import { useLocation } from "react-router-dom";
import { useState } from "react";
import ClientLogin from "./ClientLogin";
import ClientProfile from "./ClientProfile";
import Accounts from "./Accounts";

function ClientInfo() {
    const location = useLocation();
    const [client, setClient] = useState(location.state?.client || null);
    const [isLoggedIn, setIsLoggedIn] = useState(client ? true : false);

    const handleLogin = (clientData) => {
        setClient(clientData);
        setIsLoggedIn(true);
    };

    return (
        <div>
            {isLoggedIn ? (
                <div className="flex justify-evenly p-4">
                    <ClientProfile client={client} />
                    <Accounts
                        client_id={client.client_id}
                        password={client.password}
                    />
                </div>
            ) : (
                <ClientLogin onLogin={handleLogin} />
            )}
        </div>
    );
}

export default ClientInfo;
