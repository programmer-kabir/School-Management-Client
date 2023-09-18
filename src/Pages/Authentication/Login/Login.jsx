import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link, useLocation } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useAuth from "../../../Component/Hooks/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { singIn, loading,setLoading } = useAuth();
  const location = useLocation();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    singIn(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err.message);
      });
  };
  return (
    <div className="background">
      <div className="flex justify-center items-center min-h-screen">
        <div
          className="flex flex-col w-1/3 p-6 rounded-md  sm:p-10 b "
          style={{ backgroundColor: "rgba(10,10,43,0.1)" }}
        >
          <div className="mb-8 text-center ">
            <h1 className="my-3 text-4xl text-white font-bold">Log In</h1>
            <p className="text-sm text-gray-200">
              Sign in to access your account
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate=""
            action=""
            className="space-y-2 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  {...register("email", { required: true })}
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-pink-600 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  {...register("password", { required: true })}
                  placeholder="*******"
                  
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-pink-600 bg-gray-200 text-gray-900"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible className="h-5 w-5" />
                  ) : (
                    <AiFillEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="">
              <span
                onClick={() => handleResetPassword(email)}
                className="text-xs hover:underline text-gray-300 cursor-pointer hover:text-cyan-500 "
              >
                Forgot password?
              </span>
            </div>
            <div>
              <button
                type="submit"
                className="bg-cyan-500 font-medium hover:bg-cyan-700  w-full rounded-md py-3 text-white transition-colors duration-300"
              >
                Sing In
              </button>
            </div>
          </form>

          <SocialLogin />

          <p className=" pt-2 text-sm text-start text-gray-300">
            Don't have an account yet?{" "}
            <Link
              to="/register"
              className="hover:underline hover:text-cyan-500 text-gray-200"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
