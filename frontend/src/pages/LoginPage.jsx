import React, { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loginMutation, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);
  };

  return (
    <div className="h-screen flex justify-center items-center p-4 sm:p-6 md:p-8" data-theme="forest">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl">
        {/* LEFT SIDE */}
        <div className="flex flex-col sm:p-8 w-full lg:w-1/2 space-y-5">
          <div className="flex gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>

          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div>
            <h1 className="text-xl font-bold">Welcome Back!</h1>
            <p>Sign in to your account to continue your language journey</p>
          </div>
          <div>
            <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                className="input input-bordered placeholder-stone-700"
                type="email"
                autoFocus
                placeholder="jane.doe@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              ></input>
              <label>Password</label>
              <input
                className="input input-bordered placeholder-stone-700"
                type="password"
                placeholder="●●●●●●●●●"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              ></input>
              <div className="btn btn-primary w-full">
                <button type="submit" disabled={isPending}>
                  {isPending ? (
                    <div className="flex gap-2">
                      <span className="loading loading-spinner loading-xs"></span>
                      Signing in...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>
          </div>

          <p className="text-center">
            Don't have an account?{" "}
            <Link to={"/signup"}>
              <span className="text-primary link">Create one</span>
            </Link>
          </p>
        </div>
        {/* RIGHT SIDE */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-2">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/i.png" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
