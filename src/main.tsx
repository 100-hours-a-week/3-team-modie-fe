import { createRoot } from "react-dom/client";
import "./global.css";
import Routers from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-calendar/dist/Calendar.css"; // 기본 스타일 불러오되 일부만 덮어씀
import { HelmetProvider } from "react-helmet-async";
import AppMeta from "./AppMeta";

const queryClient = new QueryClient(); // tanstack-query용 설정
const helmetContext = {};

createRoot(document.getElementById("root")!).render(
  <HelmetProvider context={helmetContext}>
    <QueryClientProvider client={queryClient}>
      <AppMeta />
      <Routers />
    </QueryClientProvider>
  </HelmetProvider>
);
