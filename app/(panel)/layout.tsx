"use client";
import React, { useContext } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdminPanelContext from "@/context/AdminPanelContext";
import { redirect } from "next/navigation";
import { RedirectType } from "next/dist/client/components/redirect";
const layout = ({ children }: { children: React.ReactNode }) => {
  const { show, width, showBackDrop, userInfo } = useContext(AdminPanelContext);

  if (userInfo.id === 0) {
    redirect("/sign-in", RedirectType.replace);
  }

  return (
    <>
      <Header />
      <div className={`${showBackDrop && "backdrop"}`}></div>
      <div
        style={{
          padding:
            width !== undefined && width > 991
              ? show
                ? "0px 47px"
                : "0px 116px"
              : "0px 16px",
        }}
      >
        {children}
      </div>
      <Footer />
    </>
  );
};

export default layout;
