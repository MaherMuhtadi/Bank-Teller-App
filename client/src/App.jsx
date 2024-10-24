import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";

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
]);

function App() {
    return (
        <div>
            <NavBar />
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
