import { createBrowserRouter, Navigate } from "react-router-dom";

import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import NewProduct from "./pages/NewProduct";
import Edit from "./pages/Edit";

const router = createBrowserRouter([
    {
        path: "/products",
        element: <Products />,
    },
    {
        path: "/products/add_new",
        element: <NewProduct />,
    },
    {
        path: "/products/edit/:id",
        element: <Edit />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
