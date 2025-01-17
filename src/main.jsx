import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/themes/light.css";
import "./assets/scss/app.scss";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import * as Sentry from "@sentry/react";
import store from "./store";
import ReactQueryProvider from "./providers/react-query.tsx";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN_KEY,
  enabled: import.meta.env.PROD,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost"],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <ReactQueryProvider>
        <App />
      </ReactQueryProvider>
    </Provider>
  </>
);
