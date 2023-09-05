import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Accordion } from "react-bootstrap";
import Home from "@/public/assets/icons/Home.svg";
import Tag from "@/public/assets/icons/Tag.svg";
import Arrow from "@/public/assets/icons/Arrow-down.svg";
import AdminPanelContext from "@/context/AdminPanelContext";
const SideBar = () => {
  const { width, show, setShow } = useContext(AdminPanelContext);
  const path = usePathname();
  return (
    <div className="sidebar">
      {width > 991 && !show ? (
        <div className="fixed-icons">
          <Image
            src={Home}
            alt="Home"
            width={28}
            height={28}
            onClick={() => setShow(true)}
            style={{ cursor: "pointer" }}
          />
          <Image
            src={Tag}
            alt="Tag"
            width={28}
            height={28}
            onClick={() => setShow(true)}
            style={{ cursor: "pointer" }}
          />
        </div>
      ) : (
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div className="item">
                <Image src={Home} alt="Home" width={16} height={16} />
                <span>Dashboard</span>
              </div>
              <Image
                id="arrow"
                src={Arrow}
                alt="Arrow"
                width={16}
                height={16}
              />
            </Accordion.Header>
            <Accordion.Body>
              <Link
                href={"/"}
                className={`body-item ${path === "/" && "selected"}`}
              >
                Analysis
              </Link>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <div className="item">
                <Image src={Tag} alt="Tag" width={16} height={16} />
                <span>Product categories</span>
              </div>
              <Image
                id="arrow"
                src={Arrow}
                alt="Arrow"
                width={16}
                height={16}
              />
            </Accordion.Header>
            <Accordion.Body>
              <Link
                href={"/products"}
                className={`body-item ${
                  path.includes("products") && "selected"
                }`}
              >
                Products
              </Link>
              <Link
                href={"/categories"}
                className={`body-item ${
                  path.includes("categories") && "selected"
                }`}
              >
                Categories
              </Link>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </div>
  );
};

export default SideBar;
