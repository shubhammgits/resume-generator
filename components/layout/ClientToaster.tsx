"use client";

import { Toaster } from "react-hot-toast";

export function ClientToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#1a1a2e",
          color: "#f0f0f0",
          border: "1px solid rgba(108,99,255,0.2)"
        }
      }}
    />
  );
}
