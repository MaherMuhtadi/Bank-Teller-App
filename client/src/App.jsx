import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Dashboard from "./Dashboard/Dashboard";
import Products from "./Products/Products";
import ClientRegistration from "./ClientRegistration/ClientRegistration";
import ClientInfo from "./ClientInfo/ClientInfo";
import BalanceTransfer from "./BalanceTransfer/BalanceTransfer";
import CashTransaction from "./CashTransaction/CashTransaction";
import TellerLogin from "./Authentication/TellerLogin";
import ProtectedRoute from "./Authentication/ProtectedRoute";
import CreateTeller from "./Admin/CreateTeller";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/messages",
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/colleagues",
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/products",
        element: (
            <ProtectedRoute>
                <Products />
            </ProtectedRoute>
        ),
    },
    {
        path: "/profile",
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/client_info",
        element: (
            <ProtectedRoute>
                <ClientInfo />
            </ProtectedRoute>
        ),
    },
    {
        path: "/client_registration",
        element: (
            <ProtectedRoute>
                <ClientRegistration />
            </ProtectedRoute>
        ),
    },
    {
        path: "/transfer",
        element: (
            <ProtectedRoute>
                <BalanceTransfer />
            </ProtectedRoute>
        ),
    },
    {
        path: "/cash",
        element: (
            <ProtectedRoute>
                <CashTransaction />
            </ProtectedRoute>
        ),
    },
    {
        path: "/sign_in",
        element: <TellerLogin />,
    },
    {
        path: "/admin/create_teller",
        element: <CreateTeller />, // Create teller page temporarily added for testing
    },
    {
        path: "*",
        element: <div className="flex justify-center">Not Found</div>,
    },
]);

function App() {
    document.body.className =
        "bg-gradient-to-l from-neutral-100/95 to-emerald-100/95 text-[#3f3f3f]";
    return (
        <div className="h-screen flex flex-col">
            <NavBar />
            <div className="flex-grow">
                <RouterProvider router={router} />
            </div>
        </div>
    );
}

export default App;
