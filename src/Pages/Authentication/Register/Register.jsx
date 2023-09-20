import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Component/Hooks/useAuth";
import { useForm, Controller } from "react-hook-form";
import icon from "../../../assets/Image/icon.svg";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import SocialLogin from "../SocialLogin/SocialLogin";
import { RegisterUser } from "../../../Component/Apis/UserApis";
import logo from "../../../assets/Image/logo.gif";
import { FaFacebookF, FaGithub, FaGooglePlusG } from "react-icons/fa";
import { RiImageAddLine } from "react-icons/ri";
const Register = () => {
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const { newRegister, updateUserProfile, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
  });
  const allFieldsFilled = Object.values(formData).every(
    (value) => value && value.trim() !== ""
  );

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const url =
    "https://api.imgbb.com/1/upload?key=10695559364aab2c6fcb1fe3df5357eb";
  const onSubmit = async (data) => {
    console.log(data);
    const image = data.image[0];
    // console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((image) => {
        const photo = image?.data?.display_url;
        console.log(photo);
        // New Register
        newRegister(data.email, data.password)
          .then((result) => {
            const user = result.user;
            updateUserProfile(data.firstName, photo).then((data) => {
              RegisterUser(user);
            });
            navigate("/");
          })
          .catch((error) => console.log(error));
      })

      .then((result) => {
        const user = result.user;

        updateUserProfile(data.firstName).then((d) => {
          RegisterUser(user);
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
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
            <h1 className="text-5xl font-bold text-left tracking-wide">
              Log In
            </h1>
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
            <div className="">
              <img src={logo} alt="" className="w-auto h-16 inline-flex" />
              <h2 className="text-2xl text-white font-bold inline">
                Programming Boss
              </h2>
            </div>
            <form
              action=""
              onSubmit={handleSubmit(onSubmit)}
              className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
            >
              {/* Fast Name */}

              <div className="pb-2 pt-4">
                <input
                  type="name"
                  name="firstName"
                  id="name"
                  placeholder="Your Name Here"
                  {...register("firstName", { required: true })}
                  className="block w-full p-4 focus:bg-black outline-none rounded-full text-lg  bg-black"
                />
              </div>
              {/* Image */}

              <div className="md:flex items-center  hover:shadow-xl rounded-full p-4 text-lg bg-black ">
                <input
                  type="file"
                  id="image"
                  name="image"
                  {...register("image")}
                />
              </div>
              {/* Email Name */}
              <div className="pb-2 pt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                  className="block w-full p-4 focus:bg-black outline-none rounded-full text-lg  bg-black"
                />
              </div>
              {/* password  */}
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
                  <Link to="/login">Login Here?</Link>
                </div>
                <div className="text-left text-gray-400 hover:underline hover:text-gray-100">
                  <a href="#">Forgot your password?</a>
                </div>
              </div>
              <div className="flex gap-2 px-2 pt-1 items-center">
                <input
                  type="checkbox"
                  className="w-5 h-4"
                  name="checkbox"
                  id="checkbox"
                  onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                />
                <span className="text-white font-medium">
                  I agreement your Register
                </span>
              </div>
              <div className="px-4 pb-2 pt-4">
                <button
                  disabled={!isCheckboxChecked}
                  className={`uppercase block w-full p-4 text-lg rounded-full ${
                    !isCheckboxChecked
                      ? "bg-gray-500"
                      : "bg-cyan-500 hover:bg-cyan-600"
                  } focus:outline-none`}
                >
                  sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
