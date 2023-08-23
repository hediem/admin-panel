import React from "react";
import logo from "../public/assets/images/Symis.png";
import Image from "next/image";
import ColorSchema from "@/public/assets/kits/colors";
const loading = () => {
  return (
    <div
      className="loading"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ColorSchema.background,
      }}
    >
      <Image src={logo} alt="logo" className="logo" />
      <p>Admin Panel Symis</p>
    </div>
  );
};

export default loading;
