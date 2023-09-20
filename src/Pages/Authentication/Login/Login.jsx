import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FaFacebookF,
  FaGithub,
  FaGithubAlt,
  FaGooglePlus,
  FaGooglePlusG,
  FaInstagram,
  FaLinkedin,
  FaLinkedinIn,
  FaTwitter,
  FaUserCircle,
} from "react-icons/fa";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useAuth from "../../../Component/Hooks/useAuth";
import logo from "../../../assets/Image/logo.gif";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { singIn, loading, setLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || "/";
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
        navigate(from , {replace:true})
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  };
  return (
    <>
      <section className="min-h-screen flex items-stretch text-white pt-10 md:pt-16">
        <div
          className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)",
          }}
        >
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">Log In</h1>
            <p className="text-3xl my-4">Sign in to access your account</p>
          </div>
        </div>
        <div
          className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
          style={{ backgroundColor: "#161616" }}
        >
          <div
            className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)",
            }}
          >
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          </div>
          <div className="w-full py-6 z-20">
            <div className="my-6">
              <img src={logo} alt="" className="w-auto h-16 inline-flex" />
              <h2 className="text-2xl text-white font-bold inline">
                Programming Boss
              </h2>
            </div>
            <div className="py-6 space-x-2">
                
                
              <span className="w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white">
                 <FaFacebookF size={20}/>
              </span>
              <span className="w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white">
                <FaGooglePlusG size={20} />
              </span>
              <span className="w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white">
                <FaGithub size={20} />
              </span>
            </div>
            <p className="text-gray-100">or use email your account</p>
            <form
              action=""
              onSubmit={handleSubmit(onSubmit)}
              className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
            >
              <div className="pb-2 pt-4">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                  className="block w-full p-4  focus:bg-black outline-none rounded-full text-lg  bg-black"
                />
              </div>
              <div className="flex w-full  outline-none focus:bg-black text-lg rounded-full bg-black">
                  <input
                    className="w-full p-4 outline-none focus:bg-black rounded-full text-lg bg-black"
                   
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: true })}
                    name="password"
                    id="password"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="pr-4"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible className="h-5 w-5" />
                    ) : (
                      <AiFillEye className="h-5 w-5" />
                    )}
                  </button>
             
              </div>
              <div className="flex items-center justify-between px-2">
              <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
                <Link to='/register'>New account?</Link>
              </div>
              <div className="text-left text-gray-400 hover:underline hover:text-gray-100">
                <a href="#">Forgot your password?</a>
              </div>
              </div>
              <div className="px-4 pb-2 pt-4">
                <button className="uppercase block w-full p-4 text-lg rounded-full bg-cyan-500 hover:bg-cyan-600 focus:outline-none">
                  sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
