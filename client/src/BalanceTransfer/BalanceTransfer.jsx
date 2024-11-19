import { useState } from "react";
import ClientLogin from "../Components/ClientLogin";
import TransferForm from "./TransferForm";

function BalanceTransfer() {
    const [client, setClient] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(client ? true : false);

    const handleLogin = (clientData) => {
        setClient(clientData);
        setIsLoggedIn(true);
    };

    return (
        <div>
            {isLoggedIn ? (
                <div className="flex justify-center p-4">
                    <TransferForm
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

export default BalanceTransfer;
