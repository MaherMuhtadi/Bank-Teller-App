import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Dashboard from "./Dashboard/Dashboard";
import ClientRegistration from "./ClientRegistration/ClientRegistration";
import ClientInfo from "./ClientInfo/ClientInfo";
import BalanceTransfer from "./BalanceTransfer/BalanceTransfer";
import TellerLogin from "./Authentication/TellerLogin";
import ProtectedRoute from "./Authentication/ProtectedRoute";

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
                <Dashboard />
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
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/sign_in",
        element: <TellerLogin />, // Login page
    },
    {
        path: "*",
        element: <div className="flex justify-center">Not Found</div>,
    },
]);

function App() {
    document.body.className =
        "bg-gradient-to-l from-neutral-100/95 to-emerald-100/95";
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
