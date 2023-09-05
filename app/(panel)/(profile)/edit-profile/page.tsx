// @ts-nocheck
"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import arrow from "@/public/assets/icons/Arrow.svg";
import cloud from "@/public/assets/icons/Cloud Arrow Up.svg";
import profile from "@/public/assets/images/profile.svg";

import AdminPanelContext from "@/context/AdminPanelContext";
import ColorSchema from "@/public/assets/kits/colors";

import DatePicker from "react-multi-date-picker";
import type { Value } from "react-multi-date-picker";

import "../profile.scss";

function CustomInput({
  onFocus,
  value,
  onChange,
}: {
  onFocus: any;
  value: any;
  onChange: any;
}) {
  return (
    <input
      className="icon-input"
      style={{ width: "100%" }}
      id="birthday"
      placeholder="Select your birth date"
      type="text"
      onFocus={onFocus}
      value={value}
      onChange={onChange}
    />
  );
}

const EditProfile = () => {
  const router = useRouter();
  const { userInfo, getUserData } = useContext(AdminPanelContext);
  const [birthDate, setBirthDate] = useState<Value>(userInfo.birthday * 1000);
  const [file, setFile] = useState(null);
  const [profileData, setProfileData] = useState({
    fullname: userInfo.fullname,
    birthday: userInfo.birthday,
    gender: userInfo.gender,
    profile: userInfo.profilePic,
  });
  const checkFormFill = () => {
    if (
      profileData.fullname === "" ||
      profileData.birthday === "" ||
      profileData.gender === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const editProfile = async (e: any) => {
    e.preventDefault();

    if (checkFormFill()) {
      const data = {
        profilePic: file,
        fullname: profileData.fullname,
        birthday: profileData.birthday,
        gender: profileData.gender,
      };

      try {
        const response = await fetch(
          `http://localhost:8000/users/${userInfo.id}`,
          {
            method: "PATCH", // Use PATCH to update specific fields
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          toast.success("User updated successfully", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          getUserData(userInfo.email);
          // Handle the server's response as needed
        } else {
          toast.error("User update failed", {
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
      } catch (error) {
        toast.error(`Error update user: ${error}`, {
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
    }
  };

  return (
    <div className="edit-profile">
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
        <div className="title">Edit Profile</div>
      </div>
      <div
        className="d-flex justify-content-start align-items-center col-md-6 col-xl-5"
        style={{ gap: "12px" }}
      >
        <Image src={profile.src} alt="profile" width={48} height={48} />
        <div style={{ fontSize: "12px", color: ColorSchema.grey110 }}>
          {userInfo.fullname}
        </div>
      </div>
      <div className="inputs col-md-6 col-xl-5">
        <label htmlFor="profile">Profile photo</label>
        <div className="file-input" style={{ position: "relative" }}>
          <span>
            <Image src={cloud} alt="cloud" width={20} height={20} />
          </span>
          <span>Upload a new profile photo</span>
          <input
            className="hidden-file-input m-0"
            id="profile"
            placeholder="Upload a new profile photo"
            type="file"
            value={profileData.profile}
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className="inputs col-md-6 col-xl-5">
        <label htmlFor="fullname">Full name</label>
        <input
          id="fullname"
          placeholder="Enter your full name"
          type="text"
          value={profileData.fullname}
          onChange={(e) =>
            setProfileData((prevData) => ({
              ...prevData,
              fullname: e.target.value,
            }))
          }
        />
      </div>

      <div className="inputs col-md-6 col-xl-5">
        <label htmlFor="birthday">Birthday</label>

        <DatePicker
          value={birthDate}
          onChange={(e) => {
            setBirthDate(e);
            setProfileData((prevData) => ({
              ...prevData,
              birthday: e.unix,
            }));
          }}
          render={
            <CustomInput
              onFocus={undefined}
              value={undefined}
              onChange={undefined}
            />
          }
        />
      </div>
      {/* 0=male , 1=female , 2 = custom */}
      <div className="inputs col-md-6 col-xl-5" style={{ gap: "8px" }}>
        <label htmlFor="gender">Gender</label>
        <label className="gender">
          <input
            type="radio"
            name="gender"
            value="male"
            checked={userInfo.gender === "0" && true}
            onChange={(e) => {
              setProfileData((prevData) => ({
                ...prevData,
                gender: "0",
              }));
            }}
          />
          Male
        </label>
        <label className="gender">
          <input
            type="radio"
            name="gender"
            value="female"
            checked={userInfo.gender === "1" && true}
            onChange={(e) => {
              setProfileData((prevData) => ({
                ...prevData,
                gender: "1",
              }));
            }}
          />
          Female
        </label>
        <label className="gender">
          <input
            type="radio"
            name="gender"
            value="other"
            checked={userInfo.gender === "2" && true}
            onChange={(e) => {
              setProfileData((prevData) => ({
                ...prevData,
                gender: "2",
              }));
            }}
          />
          Custom
        </label>
      </div>

      <button
        disabled={!checkFormFill()}
        className={`save-button ${!checkFormFill() && "disabled"}`}
        onClick={(e) => {
          if (checkFormFill()) editProfile(e);
        }}
      >
        save
      </button>
      <ToastContainer />
    </div>
  );
};

export default EditProfile;
