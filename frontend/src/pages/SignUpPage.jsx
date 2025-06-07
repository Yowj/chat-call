import React, { useState } from "react";
import {ShipWheelIcon } from "lucide-react";
import useSignUp from "../hooks/useSignUp";
import { Link } from "react-router";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signupMutation, isPending, error } = useSignUp();

  const handleSubmit = (e) => {
    e.preventDefault();
    signupMutation(formData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>
          {/* ERROR MESSAGE IF ANY */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">Create an Account</h2>
            <p className="text-sm opacity-70">
              Join Streamify and start your language learning adventure!
            </p>
          </div>
          <div className="flex flex-col gap-4 my-5">
            <form onSubmit={handleSubmit}>
              <label>Full Name</label>
              <input
                className="input input-bordered w-full placeholder-stone-700"
                value={formData.fullName}
                placeholder="Jane Doe"
                required
                autoFocus
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              <label>Email</label>
              <input
                className="input input-bordered w-full placeholder-stone-700"
                value={formData.email}
                placeholder="jane.doe@gmail.com"
                required
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <label>Password</label>
              <input
                className="input input-bordered w-full placeholder-stone-700"
                value={formData.password}
                placeholder="●●●●●●●●●"
                required
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <p className="text-xs text-gray-500">Password must at least 6 characters long</p>
            </form>
            <div className="">
              <input type="radio"></input>
              <span className="pl-2">I agree to the terms of service</span>
            </div>
            <button
              className="btn btn-primary bg-primary w-full"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          <div className="mx-auto">
            <p>
              Already have an account?{" "}
              <Link to={"/login"}>
                <span className="link text-primary">Sign In</span>
              </Link>
            </p>
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="hidden lg:flex w-1/2 bg-primary  ">
          <img src="./pic1.png" alt="pic1" />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
