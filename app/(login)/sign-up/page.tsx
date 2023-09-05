"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { PiEyeClosed, PiEyeLight } from "react-icons/pi";

import ColorSchema from "@/public/assets/kits/colors";
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

const SignUp = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  const handleCheckUser = async (data: Inputs) => {
    const response = await fetch("http://localhost:8000/users");
    const users = await response.json();

    const userExists = users.some((user: Users) => user.email === data.email);
    return userExists;
  };

  const handleSignUp = async (data: Inputs) => {
    const response = await fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });
    // const token = generateToken(data);
    if (response.ok) {
      // localStorage.setItem("token", token);
      toast.success("Sign up successful", {
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
      // Handle successful sign-up, such as redirecting to another page
    } else {
      toast.error("Sign up failed", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // Handle sign-up error
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
      const userExists = handleCheckUser(data);
      if (await userExists) {
        toast.error("User already exists", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      handleSignUp(data);
    }
  };
  return (
    <div className="login">
      <div className="header">Sign Up</div>
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
          <div className="d-flex align-items-center">
            <input
              id="agree"
              type="checkbox"
              style={{ marginRight: "5px" }}
              checked={agree}
              onChange={(e) => setAgree((prev) => !prev)}
            />
            <label htmlFor="agree">
              I agree to the{" "}
              <span
                style={{ cursor: "pointer", color: ColorSchema.theme_primary }}
              >
                Privacy Policy
              </span>
            </label>
          </div>
          <button
            type="submit"
            className={`submit-button ${
              isFormDataFilled && agree ? "" : "disabled"
            }`}
            style={{
              backgroundColor: ColorSchema.theme_primary,
              color: ColorSchema.white_0,
            }}
            disabled={!isFormDataFilled && !agree}
          >
            Sign Up
          </button>
        </form>
        <div className="message">
          Already have an account?{" "}
          <Link
            href={"sign-in"}
            style={{ color: ColorSchema.theme_primary, textDecoration: "none" }}
          >
            Sign in
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
