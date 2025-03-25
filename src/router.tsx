import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./main/page/Main";
import MeetDetail from "./meetDetail/page/MeetDetail";
import CreateMeetType from "./meetCreate(update)/page/CreateMeetType";
import CreateMeetPlace from "./meetCreate(update)/page/CreateMeetPlace";
import CreateMeetOther from "./meetCreate(update)/page/CreateMeetOther";
import CreateMeetLast from "./meetCreate(update)/page/CreateMeetLast";
import MeetPaying from "./meetPaying/page/MeetPaying.tsx";
import My from "./my/page/My.tsx";
import Terms from "./my/page/Terms.tsx";
import MeetChat from "./meetChat/page/MeetChat";
import Login from "./login/page/Login.tsx";
import LoginRedirect from "./login/page/LoginRedirect.tsx";
import MeetDone from "./meetDone/page/MeetDone.tsx";

export default function Routers() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/:meetId",
      element: <MeetDetail />,
    },
    {
      path: "/meet/create/type",
      element: <CreateMeetType />,
    },
    {
      path: "/meet/create/place",
      element: <CreateMeetPlace />,
    },
    {
      path: "/meet/create/other",
      element: <CreateMeetOther />,
    },
    {
      path: "/meet/create/last",
      element: <CreateMeetLast />,
    },
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/auth/kakao/callback",
      element: <LoginRedirect />,
    },
    {
      path: "/:meetId",
      element: <MeetDetail />,
    },
    {
      path: "/:meetId/chat",
      element: <MeetChat />,
    },
    {
      path: "/end",
      element: <MeetDone />,
    },
    {
      path: "/my",
      element: <My />,
    },
    {
      path: "/term",
      element: <Terms />,
    },
    {
      path: "/paying",
      element: <MeetPaying />,
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
