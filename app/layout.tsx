import React from "react";
import "@/styles/globals.scss";
import "@/public/assets/kits/colors/colors.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";
import { AdminPanelContextProvider } from "@/context/AdminPanelContext";
export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Generated by hediem",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="Segoe UI Regular">
        <AdminPanelContextProvider>{children}</AdminPanelContextProvider>
      </body>
    </html>
  );
}
