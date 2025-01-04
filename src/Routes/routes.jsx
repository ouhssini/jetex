import { createBrowserRouter } from "react-router";
import VolDetail from "../component/VolDetail";
import VolsList from "../component/VolsList";
import Layout from "../Layout/Layout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <VolsList />,
      },
      {
        path: "/:id",
        element: <VolDetail />,
      },
    ],
  },
]);
