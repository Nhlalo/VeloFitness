import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./styles/global.css";
import { router } from "./route";
import AuthProvider from "./context/authContext";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
