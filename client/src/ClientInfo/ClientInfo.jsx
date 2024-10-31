import { useLocation } from "react-router-dom";
import { useState } from "react";
import ClientLogin from "./ClientLogin";
import ClientProfile from "./ClientProfile";

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
                <ClientProfile client={client} />
            ) : (
                <ClientLogin onLogin={handleLogin} />
            )}
        </div>
    );
}

export default ClientInfo;
