import { createRoot } from "react-dom/client";
import "./global.css";
import Routers from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-calendar/dist/Calendar.css";
import { initFCM } from "./utils/fcm";

// React Query 클라이언트
const queryClient = new QueryClient();
initFCM();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Routers />
  </QueryClientProvider>
);
