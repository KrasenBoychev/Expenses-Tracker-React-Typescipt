// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <ErrorBoundary
      fallback={
        <div className="flex justify-center mt-20 text-2xl font-bold uppercase">
          Something went wrong
        </div>
      }
    >
      <App />
    </ErrorBoundary>
  </BrowserRouter>
  // </StrictMode>
);
