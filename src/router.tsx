import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./main/page/Main";
import MeetDetail from "./meetDetail/page/MeetDetail";
import MeetCreate from "./meetCreate(update)/page/MeetCreate";
import MeetDone from "./meetDone/page/MeetDone.tsx";

export default function Routers() {
  const router = createBrowserRouter([
    {
      path: "/",
      //   element: <Layout />,
      children: [
        { path: "/", element: <Main /> },
        { path: "/:meetId", element: <MeetDetail /> },
        { path: "/create", element: <MeetCreate /> },
        { path: "/end", element: <MeetDone /> },
      ],
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
