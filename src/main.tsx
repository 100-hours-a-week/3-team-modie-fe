import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import Routers from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-calendar/dist/Calendar.css"; // 기본 스타일 불러오되 일부만 덮어씀

const queryClient = new QueryClient(); // tanstack-query용 설정

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Routers />
    </QueryClientProvider>
  </StrictMode>
);
