import Clients from "./Clients";
import Transactions from "./Transactions";
import Agenda from "./Agenda";

function Dashboard() {
    return (
        <div className="flex justify-between h-full p-4">
            <Agenda />
            <div className="rounded-xl bg-neutral-50 w-2/5 p-4 shadow-md">
                <h2 className="font-bold text-xl">Activities</h2>
            </div>
            <div className="flex flex-col space-y-6 w-1/4 pl-4">
                <Clients />
                <Transactions />
            </div>
        </div>
    );
}

export default Dashboard;
