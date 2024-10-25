import NewAccount from "./NewAccount";
import NewClient from "./NewClient";

function ClientRegistration() {
    return (
        <div className="flex items-center justify-evenly h-full p-4">
            <NewClient />
            <div className="flex flex-col items-center h-full">
                <div className="border border-black h-1/2 w-0"></div>
                or
                <div className="border border-black h-1/2 w-0"></div>
            </div>
            <NewAccount />
        </div>
    );
}

export default ClientRegistration;
