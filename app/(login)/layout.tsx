import React from "react";
import Image from "next/image";
import { cookies } from "next/headers";
import ColorSchema from "@/public/assets/kits/colors";

import logo from "@/public/assets/images/Symis.png";
import headerImage from "@/public/assets/images/image-header.svg";
import { redirect } from "next/navigation";
import { RedirectType } from "next/dist/client/components/redirect";

const layout = ({ children }: { children: React.ReactNode }) => {
  if (cookies().has("token")) {
    redirect("/", RedirectType.replace);
  }
  return (
    <div className="row">
      <div className="d-md-none">
        <div className="p-4">
          <Image src={logo} alt="logo" width={100} />
        </div>
      </div>
      <div
        className="d-none d-md-flex d-xxl-none justify-content-between head p-4"
        style={{
          backgroundColor: ColorSchema.blue1,
          color: ColorSchema.background,
        }}
      >
        <div className="d-flex flex-column p-4 mt-3">
          <h4>Admin Panel</h4>
          <p>
            Admin Panel is a project template that provides common features such
            as Sign-up & Sign-in.This template is powered by Hedieh Moshtaghi.
          </p>
        </div>
        <Image src={headerImage} alt="headerImage" style={{ width: "100%" }} />
      </div>
      <div
        className="d-none p-2 d-xxl-flex flex-column align-items-center justify-content-center col-6"
        style={{
          backgroundColor: ColorSchema.blue1,
          color: ColorSchema.background,
          height: "100vh",
        }}
      >
        <Image
          src={headerImage}
          alt="headerImage"
          style={{ width: "80%", height: "auto" }}
        />
        <div className="d-flex flex-column p-5 mt-3">
          <h3>Admin Panel</h3>
          <p style={{ width: "65%" }}>
            Admin Panel is a project template that provides common features such
            as Sign-up & Sign-in.This template is powered by Hedieh Moshtaghi.
          </p>
        </div>
      </div>
      <div className="col-xxl-6">{children}</div>
    </div>
  );
};

export default layout;
