"use client";
import React, { useContext } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdminPanelContext from "@/context/AdminPanelContext";
const layout = ({ children }: { children: React.ReactNode }) => {
  const { show } = useContext(AdminPanelContext);
  return (
    <>
      <Header />
      <div style={{ padding: show ? "0px 47px" : "0px 116px" }}>{children}</div>

      <Footer />
    </>
  );
};

export default layout;
