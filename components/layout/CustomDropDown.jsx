"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import cookies from "js-cookie";
import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";
import AdminPanelContext from "@/context/AdminPanelContext";

import Chevron from "@/public/assets/icons/Chevron.svg";
import Edit from "@/public/assets/icons/Edit.svg";
import Key from "@/public/assets/icons/Key Reset.svg";
import SignOut from "@/public/assets/icons/Sign Out.svg";
import profile from "@/public/assets/images/profile.svg";

import ColorSchema from "@/public/assets/kits/colors";
import { redirect, useRouter } from "next/navigation";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");
    const { userInfo } = useContext(AdminPanelContext);

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <div className="row custom-part">
          <div className="col-3">
            <div className="pro-parent big">
              <div className="profile big">
                <Image src={profile.src} alt="profile" width={48} height={48} />
              </div>
            </div>
          </div>
          <div className="description col-6">
            <div className="name">{userInfo.fullname}</div>
            <Link href={"https://github.com/hediem"} className="link">
              github.com/hediem
            </Link>
          </div>
        </div>
        <hr />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

const CustomDropDown = () => {
  const router = useRouter();
  const logout = () => {
    cookies.remove("token");
    redirect("/sign-in");
  };
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <Image
          src={Chevron.src}
          alt="Chevron"
          width={12}
          height={12}
          style={{ cursor: "pointer" }}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        <Dropdown.Item eventKey="1">
          <Link href="/edit-profile">
            <Image src={Edit} alt="Edit" width={20} height={20} />
            <span>Edit profile</span>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item eventKey="2">
          <Link href="/change-password">
            <Image src={Key} alt="Key" width={20} height={20} />
            <span>Change password</span>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="3"
          style={{ color: ColorSchema.status_severe_warning_type_icon }}
          onClick={logout}
        >
          <Image src={SignOut} alt="SignOut" width={20} height={20} />
          <span>sign out</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomDropDown;
