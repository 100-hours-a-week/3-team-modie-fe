import { createRoot } from "react-dom/client";
import "./global.css";
import Routers from "./router";
import * as Sentry from "@sentry/react";
import "./__sentry__/instrument";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-calendar/dist/Calendar.css";
import Fallback from "./common/page/Fallback";

// React Query 클라이언트
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Sentry.ErrorBoundary fallback={<Fallback />}>
      <Routers />
    </Sentry.ErrorBoundary>
  </QueryClientProvider>
);
