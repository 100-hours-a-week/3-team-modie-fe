import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./main/page/Main";
import MeetDetail from "./meetDetail/page/MeetDetail";
import CreateMeetType from "./meetCreate(update)/page/CreateMeetType";
import CreateMeetPlace from "./meetCreate(update)/page/CreateMeetPlace";
import CreateMeetOther from "./meetCreate(update)/page/CreateMeetOther";
import CreateMeetLast from "./meetCreate(update)/page/CreateMeetLast";

export default function Routers() {
  const router = createBrowserRouter([
    {
      path: "/",
      //   element: <Layout />,
      children: [
        { path: "/", element: <Main /> },
        { path: "/:meetId", element: <MeetDetail /> },
        { path: "/create", element: <CreateMeetType /> },
        { path: "/createMeetPlace", element: <CreateMeetPlace /> },
        { path: "/createMeetOther", element: <CreateMeetOther /> },
        { path: "/createMeetLast", element: <CreateMeetLast /> },
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
