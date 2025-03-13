import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./main/page/testMain.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient(); // tanstack-query용 설정

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
