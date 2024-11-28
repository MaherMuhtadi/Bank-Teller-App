import Agenda from "./Agenda";

function TellerHub() {
    return (
        <div className="flex w-2/5 relative">
            <Agenda />
            <a href="/profile">
                <img
                    src="/avatar.svg"
                    alt="Avatar"
                    className="border-2 border-neutral-50 rounded-full bg-neutral-50 w-32 h-32 absolute top-0 left-0"
                />
            </a>
            <div className="absolute top-0 left-32 right-0 flex flex-col h-16 justify-center">
                <h3 className="font-semibold text-lg text-center">
                    Hello, {sessionStorage.getItem("employee_first_name")}!
                </h3>
            </div>
        </div>
    );
}

export default TellerHub;
