import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./main/page/Main";
import MeetDetail from "./meetDetail/page/MeetDetail";
import MeetCreate from "./meetCreate(update)/page/MeetCreate";
import MeetChat from "./meetChat/page/MeetChat";
import Login from "./login/page/Login.tsx";
import LoginRedirect from "./login/page/LoginRedirect.tsx";
import MeetDone from "./meetDone/page/MeetDone.tsx";

export default function Routers() {
  const router = createBrowserRouter([
    {
      path: "/",
      //   element: <Layout />,
      children: [
        { path: "/", element: <Main /> },
        { path: "/login", element: <Login /> },
        { path: "/auth/kakao/callback", element: <LoginRedirect /> },
        { path: "/:meetId", element: <MeetDetail /> },
        { path: "/create", element: <MeetCreate /> },
        { path: "/:meetId/chat", element: <MeetChat /> },
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
