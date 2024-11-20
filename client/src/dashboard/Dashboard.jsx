import Clients from "./Clients";
import Transactions from "./Transactions";
import Agenda from "./Agenda";
import Summaries from "./Summaries";

function Dashboard() {
    return (
        <div className="flex justify-between h-full p-4">
            <Summaries />
            <Agenda />
            <div className="flex flex-col space-y-6 w-1/4 pl-4">
                <Clients />
                <Transactions />
            </div>
        </div>
    );
}

export default Dashboard;
