import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import Routers from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient(); // tanstack-query용 설정

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Routers />
    </QueryClientProvider>
  </StrictMode>
);
