import ColorSchema from "@/public/assets/kits/colors";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Frame from "@/public/assets/icons/Frame.svg";
import Linkedin from "@/public/assets/icons/Linkedin.svg";
import GitHub from "@/public/assets/icons/GitHub.svg";
import Twitter from "@/public/assets/icons/Twitter.svg";
const Footer = () => {
  return (
    <div
      className="footer px-3 px-md-4"
      style={{
        backgroundColor: ColorSchema.white_0,
        borderBottom: `1px solid ${ColorSchema.grey10}`,
      }}
    >
      <div className="w-100 d-flex d-sm-none flex-row align-items-center justify-content-between">
        <div className="col-6">
          <div className="d-flex flex-column align-items-start justify-content-start">
            <div>Made with ❤️ by Hediem</div>
            <Link href={"https://github.com/hediem"} className="link">
              github.com/hediem
            </Link>
          </div>
        </div>
        <div
          className="col-6 d-flex align-items-center justify-content-end"
          style={{ gap: "12px" }}
        >
          <div className="icon">
            <Image src={Twitter} alt="Twitter" width={13} height={13} />
          </div>
          <Link href="https://github.com/hediem" className="icon">
            <Image src={GitHub} alt="GitHub" width={13} height={13} />
          </Link>
          <div className="icon">
            <Image src={Frame} alt="Frame" width={13} height={13} />
          </div>
          <Link
            href={"https://www.linkedin.com/in/hediehmoshtaghi"}
            className="icon"
          >
            <Image src={Linkedin} alt="Linkedin" width={13} height={13} />
          </Link>
        </div>
      </div>
      <div className="w-100 d-none d-sm-flex flex-row align-items-center justify-content-between">
        <div className="col-4  d-flex align-items-center justify-content-center">
          <Link href={"https://github.com/hediem"} className="link">
            github.com/hediem
          </Link>
        </div>
        <div
          className="col-4 d-flex align-items-center justify-content-center"
          style={{ gap: "12px" }}
        >
          <div className="icon">
            <Image src={Twitter} alt="Twitter" width={13} height={13} />
          </div>
          <Link href="https://github.com/hediem" className="icon">
            <Image src={GitHub} alt="GitHub" width={13} height={13} />
          </Link>
          <div className="icon">
            <Image src={Frame} alt="Frame" width={13} height={13} />
          </div>
          <Link
            href={"https://www.linkedin.com/in/hediehmoshtaghi"}
            className="icon"
          >
            <Image src={Linkedin} alt="Linkedin" width={13} height={13} />
          </Link>
        </div>
        <div className="col-4  d-flex align-items-center justify-content-center">
          Made with ❤ by Hediem
        </div>
      </div>
    </div>
  );
};

export default Footer;
