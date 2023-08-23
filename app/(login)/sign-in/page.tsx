"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PiEyeClosed, PiEyeLight } from "react-icons/pi";
import "../login-styles.scss";
import ColorSchema from "@/public/assets/kits/colors";
import Link from "next/link";
import { Metadata } from "next";
type Inputs = {
  email: string;
  password: string;
};
export const metadata: Metadata = {
  title: "Sign in",
};
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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
    </div>
  );
};

export default SignIn;
