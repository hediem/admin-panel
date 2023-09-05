"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { PiEyeClosed, PiEyeLight } from "react-icons/pi";

import ColorSchema from "@/public/assets/kits/colors";
import AdminPanelContext from "@/context/AdminPanelContext";
import "../login-styles.scss";
type Inputs = {
  email: string;
  password: string;
};
type Users = {
  email: string;
  password: string;
  id: string;
};
const SignIn = () => {
  const router = useRouter();
  const { getUserData } = useContext(AdminPanelContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (data: Inputs) => {
    const response = await fetch("http://localhost:8000/users", {
      method: "GET",
    });
    const users = await response.json();

    const user = users.find(
      (u: Users) => u.email === data.email && u.password === data.password
    );
    const falsePass = users.find(
      (u: Users) => u.email === data.email && u.password !== data.password
    );
    // const token = generateToken(data);

    if (user) {
      // localStorage.setItem("token", token);
      toast.success("Sign in successful", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/", { scroll: false });

      setLoading(false);
      getUserData(data.email);
      // Handle successful sign-in, such as setting user authentication
    } else if (falsePass) {
      toast.error("Email or password is wrong!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    } else {
      toast.error("Sign in failed", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);

      // Handle sign-in error
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const formData = watch();
  const isFormDataFilled =
    Object.values(formData).length === 0
      ? false
      : Object.values(formData).every((value) => value !== ""); // Check if any field has a value

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isFormDataFilled) {
      setLoading(true);
      handleSignIn(data);
      console.log(data);
    }
  };

  return (
    <div className="login">
      <div className="header">Sign In</div>
      <div className="form-group">
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
          <div className="inputs">
            <label htmlFor="email">Email</label>
            <input
              className={`${errors.email && "error"}`}
              id="email"
              placeholder="Email"
              type="text"
              {...register("email", {
                required: true,
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              })}
            />
            {errors.email?.type === "required" ? (
              <span className="alert-form" role="alert">
                Email is required
              </span>
            ) : (
              errors.email && (
                <span className="alert-form">
                  Please enter a valid email format.
                </span>
              )
            )}
          </div>
          <div className="inputs">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                className={`${errors.password && "error"}`}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: true, min: 8 })}
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <PiEyeClosed /> : <PiEyeLight />}
              </span>
            </div>
            {errors.password?.type === "required" ? (
              <span className="alert-form" role="alert">
                Password is required
              </span>
            ) : (
              errors.password && (
                <span className="alert-form">8 characters minimum.</span>
              )
            )}
          </div>

          <button
            type="submit"
            className={`submit-button ${loading ? "loading" : ""} ${
              isFormDataFilled ? "" : "disabled"
            }`}
            style={{
              backgroundColor: ColorSchema.theme_primary,
              color: ColorSchema.white_0,
            }}
            disabled={!isFormDataFilled}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Loading...</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <div
          className="d-flex"
          style={{
            color: ColorSchema.theme_primary,
            margin: "0px auto",
            marginTop: "26px",
          }}
        >
          forgot password?
        </div>
        <div className="message">
          Don’t have an account?{" "}
          <Link
            href={"sign-up"}
            style={{ color: ColorSchema.theme_primary, textDecoration: "none" }}
          >
            Sign Up
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
