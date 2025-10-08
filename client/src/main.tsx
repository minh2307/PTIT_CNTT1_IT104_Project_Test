import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "antd/dist/reset.css";
import { notification } from "antd";

// Ensure notifications are mounted on document.body and visible above app layers
notification.config({
  top: 64,
  duration: 3,
  // attach to body to avoid being clipped by app containers
  getContainer: () => document.body,
});

import { RouterProvider } from "react-router-dom";
import { router } from "./routers/index.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.redux.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
