"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import arrow from "@/public/assets/icons/Arrow.svg";
import AdminPanelContext from "@/context/AdminPanelContext";
import "../profile.scss";

const ChangePassword = () => {
  const router = useRouter();
  const { userInfo } = useContext(AdminPanelContext);
  const [passwordData, setPasswordData] = useState({
    old: "",
    new: "",
    repeat: "",
  });
  const [errors, setErrors] = useState({
    ms1: "",
    ms2: "",
    ms3: "",
  });
  const checkFormFill = () => {
    if (
      passwordData.old === "" ||
      passwordData.new === "" ||
      passwordData.repeat == ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  const checkForm = async () => {
    const user = await fetch(`http://localhost:8000/users?${userInfo.id}`).then(
      (response) => response.json()
    );
    if (user[0].password !== passwordData.old) {
      setErrors((prev) => ({
        ...prev,
        ms3: "Old password do not match to user password",
      }));
      return true;
    } else {
      setErrors((prev) => ({
        ...prev,
        ms3: "",
      }));
    }
    if (passwordData.old === passwordData.new) {
      setErrors((prev) => ({
        ...prev,
        ms1: "New password cannot be the same as your existing password.",
      }));
      return true;
    } else {
      setErrors((prev) => ({
        ...prev,
        ms1: "",
      }));
    }
    if (passwordData.new !== passwordData.repeat) {
      setErrors((prev) => ({
        ...prev,
        ms2: "Passwords do not match. Please make sure the new password and confirmed password are identical.",
      }));
      return true;
    } else {
      setErrors((prev) => ({
        ...prev,
        ms2: "",
      }));
    }
  };
  const changePassword = async () => {
    try {
      if (await checkForm()) {
        return;
      }

      const response = await fetch(
        `http://localhost:8000/users/${userInfo.id}`,
        {
          method: "PATCH", // Use PATCH or PUT depending on your API setup
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: passwordData.new,
          }),
        }
      );

      if (!response.ok) {
        toast.error("Password update failed", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        throw new Error("Password update failed");
      }
      toast.success("Password updated successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      toast.error(`Error updating password: ${error}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div className="change-password">
      <div className="header justify-content-start" style={{ gap: "8px" }}>
        <Image
          style={{ cursor: "pointer" }}
          src={arrow}
          alt="arrow"
          width={24}
          height={24}
          onClick={() => {
            router.push("/");
          }}
        />
        <div className="title">Change Password</div>
      </div>
      <div className="inputs col-md-6 col-xl-5">
        <label htmlFor="old">Old password</label>
        <input
          className={`${errors.ms3 !== "" && "error"}`}
          id="old"
          placeholder="Enter old password"
          type="password"
          value={passwordData.old}
          onChange={(e) =>
            setPasswordData((prevData) => ({
              ...prevData,
              old: e.target.value,
            }))
          }
        />
        {errors.ms3 !== "" && <span className="alert-form">{errors.ms3}</span>}
      </div>

      <div className="inputs col-md-6 col-xl-5">
        <label htmlFor="new">New Password</label>
        <input
          className={`${errors.ms1 !== "" && "error"}`}
          id="new"
          placeholder="Enter new password"
          type="password"
          value={passwordData.new}
          onChange={(e) =>
            setPasswordData((prevData) => ({
              ...prevData,
              new: e.target.value,
            }))
          }
        />
        {errors.ms1 !== "" && <span className="alert-form">{errors.ms1}</span>}
      </div>

      <div className="inputs col-md-6 col-xl-5">
        <label htmlFor="repeat">Confirm new password</label>
        <input
          className={`${errors.ms2 !== "" && "error"}`}
          id="repeat"
          placeholder="Enter new password again"
          type="password"
          value={passwordData.repeat}
          onChange={(e) =>
            setPasswordData((prevData) => ({
              ...prevData,
              repeat: e.target.value,
            }))
          }
        />
        {errors.ms2 !== "" && <span className="alert-form">{errors.ms2}</span>}
      </div>

      <button
        disabled={!checkFormFill()}
        className={`save-button ${!checkFormFill() && "disabled"}`}
        onClick={(e) => {
          if (checkFormFill()) changePassword();
        }}
      >
        save
      </button>
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;
