import Clients from "./Clients";
import Transactions from "./Transactions";

function Dashboard() {
    return (
        <div className="flex justify-between min-h-screen p-4">
            <div className="rounded-xl bg-neutral-50 w-1/4 h-1/1 p-4 shadow-md">
                <h2 className="font-bold">Schedule</h2>
            </div>
            <div className="rounded-xl bg-neutral-50 w-2/5 h-1/1 p-4 shadow-md">
                <h2 className="font-bold">Activities</h2>
            </div>
            <div className="flex flex-col space-y-6 w-1/4 h-1/1 pl-4">
                <Clients />
                <Transactions />
            </div>
        </div>
    );
}

export default Dashboard;
