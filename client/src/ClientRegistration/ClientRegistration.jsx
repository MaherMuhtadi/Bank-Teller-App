import NewAccount from "./NewAccount";
import NewClient from "./NewClient";

function ClientRegistration() {
    return (
        <div className="flex justify-evenly p-4">
            <NewAccount />
            <div className="flex flex-col items-center">
                <div className="border border-black h-1/2 w-0"></div>
                or
                <div className="border border-black h-1/2 w-0"></div>
            </div>
            <NewClient />
        </div>
    );
}

export default ClientRegistration;
