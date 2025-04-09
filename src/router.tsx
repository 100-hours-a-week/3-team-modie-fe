import { useEffect } from "react";
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
import Splash from "./common/page/Splash.tsx";
import ProtectedRoute from "./common/components/ProtectedRoute.tsx";
import RedirectIfAuthenticated from "./common/components/RedirectIfAuthenticated.tsx";
import { setGlobalErrorToast } from "./__sentry__/useErrorHandler.ts";
import { useToast } from "./common/hooks/useToastMsg.tsx";

export default function Routers() {
  const { showToast } = useToast();

  useEffect(() => {
    setGlobalErrorToast(showToast);
  }, [showToast]);

  const router = createBrowserRouter([
    { path: "/", element: <Main /> },
    {
      path: "/login",
      element: (
        <RedirectIfAuthenticated>
          <Login />
        </RedirectIfAuthenticated>
      ),
    },
    { path: "/auth/kakao/callback", element: <LoginRedirect /> },
    { path: "/:meetId", element: <MeetDetail /> },
    { path: "/:meetId/chat", element: <MeetChat /> },
    {
      path: "/term",
      element: <Terms />,
    },
    {
      path: "/meet/create/type",
      element: <CreateMeetType />,
    },

    {
      path: "/meet/create/place",
      element: (
        <ProtectedRoute>
          <CreateMeetPlace />
        </ProtectedRoute>
      ),
    },
    {
      path: "/meet/create/other",
      element: (
        <ProtectedRoute>
          <CreateMeetOther />
        </ProtectedRoute>
      ),
    },
    {
      path: "/meet/create/last",
      element: (
        <ProtectedRoute>
          <CreateMeetLast />
        </ProtectedRoute>
      ),
    },
    {
      path: "/paying",
      element: (
        <ProtectedRoute>
          <MeetPaying />
        </ProtectedRoute>
      ),
    },
    {
      path: "/my",
      element: (
        <ProtectedRoute>
          <My />
        </ProtectedRoute>
      ),
    },

    {
      path: "/end",
      element: (
        <ProtectedRoute>
          <MeetDone />
        </ProtectedRoute>
      ),
    },
    {
      path: "/splash",
      element: <Splash />,
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
