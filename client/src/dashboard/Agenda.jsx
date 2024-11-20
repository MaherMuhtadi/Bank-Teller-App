function Agenda() {
    return (
        <div className="flex w-2/5 relative">
            <div className="rounded-xl bg-neutral-50 w-full p-4 mt-16 shadow-md">
                <h2 className="font-bold text-xl text-right">Your Agenda</h2>
            </div>
            <a href="/profile">
                <img
                    src="/avatar.svg"
                    alt="Avatar"
                    className="border-2 border-neutral-50 rounded-full bg-neutral-50 w-32 h-32 absolute top-0 left-0"
                />
            </a>
            <div className="absolute top-0 left-32 right-0 flex flex-col h-16 justify-center">
                <h3 className="font-bold text-lg italic text-center">
                    Hello, {sessionStorage.getItem("employee_first_name")}!
                </h3>
            </div>
        </div>
    );
}

export default Agenda;
