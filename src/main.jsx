import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Routers/routes";
import Providers from "./Authentication/Providers/Providers";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Providers>
        <RouterProvider router={router} />
        <Toaster />
    </Providers>
  </StrictMode>,
);
