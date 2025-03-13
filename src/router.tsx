import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TestMain from "./main/page/testMain";

export default function Routers() {
  const router = createBrowserRouter([
    {
      path: "/",
      //   element: <Layout />,
      children: [{ path: "/", element: <TestMain /> }],
    },
    {
      path: "*",
      element: (
        <h3>
          <b>NOT FOUND PAGE</b>
        </h3>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}
