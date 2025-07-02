import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");

const root = createRoot(container);

// Remove loading fallback when React app loads
const loadingElement = container.querySelector('.loading');
if (loadingElement) {
  loadingElement.remove();
}

// Use StrictMode only in development for better performance in production
const isDevelopment = import.meta.env.DEV;

if (isDevelopment) {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  root.render(<App />);
}
