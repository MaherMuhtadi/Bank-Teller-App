import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard/Dashboard";
import ClientRegistration from "./ClientRegistration/ClientRegistration";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
    },
    {
        path: "/messages",
        element: <Dashboard />,
    },
    {
        path: "/colleagues",
        element: <Dashboard />,
    },
    {
        path: "/products",
        element: <Dashboard />,
    },
    {
        path: "client_info",
        element: <Dashboard />,
    },
    {
        path: "client_registration",
        element: <ClientRegistration />,
    },
    {
        path: "transfer",
        element: <Dashboard />,
    },
    {
        path: "cash",
        element: <Dashboard />,
    },
    {
        path: "*",
        element: <div className="flex justify-center">Not Found</div>,
    },
]);

function App() {
    return (
        <div className="bg-gradient-to-l from-neutral-100/95 to-emerald-100/95 min-h-screen">
            <NavBar />
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
