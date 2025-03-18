import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./main/page/Main";
import MeetDetail from "./meetDetail/page/MeetDetail";
import CreateMeetType from "./meetCreate(update)/page/CreateMeetType";

export default function Routers() {
  const router = createBrowserRouter([
    {
      path: "/",
      //   element: <Layout />,
      children: [
        { path: "/", element: <Main /> },
        { path: "/:meetId", element: <MeetDetail /> },
        { path: "/create", element: <CreateMeetType /> },
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
