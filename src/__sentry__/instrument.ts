import * as Sentry from "@sentry/react";
import { browserTracingIntegration } from "@sentry/browser";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [browserTracingIntegration(), Sentry.replayIntegration()],
  tracePropagationTargets: [
    "localhost",
    /^https:\/\/(dev\.modie\.site)$/,
    /^https:\/\/(modie\.site)$/,
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
