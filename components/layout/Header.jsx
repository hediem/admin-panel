"use client";
import React, { useContext } from "react";
import AdminPanelContext from "@/context/AdminPanelContext";
import { usePathname } from "next/navigation";

import { Breadcrumb, Image } from "react-bootstrap";
import ColorSchema from "@/public/assets/kits/colors";
import { AiOutlineMenu } from "react-icons/ai";

import CustomDropDown from "./CustomDropDown";
import SideBar from "./SideBar";

import logo from "../../public/assets/images/Symis.png";
import logoLight from "../../public/assets/images/Symis light.png";
import logoLightText from "../../public/assets/images/Symis light text.png";
import profile from "../../public/assets/images/profile.svg";
import close from "../../public/assets/icons/Dismiss.svg";

import "./layout.scss";

const Header = () => {
  const {
    show,
    setShow,
    width,
    setShowBackDrop,
    isModalAddandEditOpen,
    isModalDeleteOpen,
  } = useContext(AdminPanelContext);
  const path = usePathname();
  const pathSegments = path.split("/");
  const links = [];
  const formattedPathSegments = pathSegments.map((segment, index) => {
    const words = segment.split("-");
    const formattedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    links.push(segment);
    return {
      real: links.join("/"),
      format: formattedWords.join(""),
    };
  });

  return (
    <div
      className="d-flex flex-row align-items-center justify-content-between header px-3 px-md-4"
      style={{
        backgroundColor: ColorSchema.white_0,
        borderBottom: `1px solid ${ColorSchema.grey10}`,
      }}
    >
      <div
        className="d-flex flex-row align-items-center"
        style={{ gap: "24px" }}
      >
        {show && width > 991 ? (
          ""
        ) : (
          <div
            onClick={(e) => {
              setShow(true);
              if (width <= 991) {
                setShowBackDrop(true);
              }
            }}
            style={{ cursor: "pointer" }}
          >
            <AiOutlineMenu
              style={{
                width: "24px",
                height: "24px",
                color: ColorSchema.theme_primary,
              }}
            />
          </div>
        )}

        <Image
          src={logo.src}
          width={80}
          height={25}
          alt="logo"
          className="logo d-lg-none"
        />
        <Breadcrumb
          className={`d-none d-md-block ${show && width > 991 ? "ps-5" : ""}`}
        >
          {formattedPathSegments[1].real !== "/" ? (
            formattedPathSegments.map((val, index) => {
              return (
                <div key={index} className="d-flex align-items-center">
                  <Breadcrumb.Item href={`${val.real}`}>
                    {val.format === "" ? "Home" : val.format}
                  </Breadcrumb.Item>
                  {index !== formattedPathSegments.length - 1 && (
                    <span className="mx-3">{">"}</span>
                  )}
                </div>
              );
            })
          ) : (
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          )}
        </Breadcrumb>
      </div>
      <div
        className="d-flex flex-row align-items-center"
        style={{ gap: "4px" }}
      >
        <div className="pro-parent small">
          <div className="profile small">
            <Image src={profile.src} alt="profile" width={28} height={28} />
          </div>
        </div>

        <span style={{ fontSize: "10px", color: ColorSchema.grey160 }}>
          Hedieh Moshtaghi
        </span>
        <CustomDropDown />
      </div>

      <div
        id="mySidenav"
        className={`sidenav ${show ? "show" : ""} ${
          width > 991 ? "fixed" : ""
        }`}
      >
        <div className="side-head">
          {show ? (
            <Image
              src={logoLight.src}
              alt="logoLight"
              width={80}
              height={25}
              style={{ position: "relative", top: "3px" }}
            />
          ) : width > 991 ? (
            <Image
              src={logoLightText.src}
              alt="logoLightText"
              width={40}
              height={15}
              style={{ position: "relative", top: "20px" }}
            />
          ) : (
            ""
          )}
          {show ? (
            <div
              className="closebtn"
              onClick={(e) => {
                setShow(false);
                if (!isModalAddandEditOpen && !isModalDeleteOpen) {
                  setShowBackDrop(false);
                }
              }}
            >
              <Image src={close.src} alt="close" width={24} height={24} />
            </div>
          ) : (
            ""
          )}
        </div>
        <hr />

        <SideBar />
      </div>
    </div>
  );
};

export default Header;
