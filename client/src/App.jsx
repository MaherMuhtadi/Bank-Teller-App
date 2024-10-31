import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard/Dashboard";
import ClientRegistration from "./ClientRegistration/ClientRegistration";
import ClientInfo from "./ClientInfo/ClientInfo";

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
        path: "/sign_in",
        element: <Dashboard />,
    },
    {
        path: "/profile",
        element: <Dashboard />,
    },
    {
        path: "/client_info",
        element: <ClientInfo />,
    },
    {
        path: "/client_registration",
        element: <ClientRegistration />,
    },
    {
        path: "/transfer",
        element: <Dashboard />,
    },
    {
        path: "/cash",
        element: <Dashboard />,
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
