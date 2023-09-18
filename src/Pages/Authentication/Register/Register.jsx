import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Component/Hooks/useAuth";
import { useForm, Controller } from "react-hook-form";
import icon from "../../../assets/Image/icon.svg";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import SocialLogin from "../SocialLogin/SocialLogin";
import { RegisterUser } from "../../../Component/Apis/UserApis";

const Register = () => {
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
    // console.log(data);
    const image = data.image[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((image) => {
        const photo = image?.data?.display_url;
        // New Register
        newRegister(data.email, data.password)
          .then((result) => {
            const user = result.user;
            updateUserProfile(data.firstName, photo).then(
              (data) => {
                RegisterUser(user);
              }
            );
            navigate("/");
          })
          .catch((error) => console.log(error));
      });

    //   .then((result) => {
    //     const user = result.user;

    //     updateUserProfile(data.firstName).then((d) => {
    //       RegisterUser(user);
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  };
  return (
    <div>
      <div className="background md:flex flex-row-reverse items-center justify-between md:pr-5 md:h-screen md:p-10">
        <img
          className="md:w-1/3 w-full style p-10 pb-7 md:pb-0"
          src={icon}
          alt=""
        />

        <div className="md:w-3/5 w-full px-5">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div
              className="space-y-3 p-6 w-full md:ml-5 rounded-2xl "
              style={{ backgroundColor: "rgba(10,10,43,0.1)" }}
            >
              <h2 className="text-3xl font-semibold text-center text-white pb-5">
                Register Form
              </h2>
              <div className=" md:space-y-0 md:space-x-2">
                <Controller
                  name="firstName"
                  control={control}
                  rules={{ required: "First name is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="flex-1 p-2 focus:outline-none rounded-lg  placeholder-gray-400  w-full"
                      placeholder="Your Ful Name"
                      onChange={(e) => {
                        handleInputChange("firstName", e.target.value);
                        field.onChange(e);
                      }}
                    />
                  )}
                />
              </div>


              <div className="md:flex space-y-4 gap-3 md:space-y-0">
                <input
                  type="file"
                  name="image"
                  id="image"
                  {...register("image")}
                  className="flex-1 p-2 font-semibold bg-white placeholder-gray-400 focus:outline-none rounded-lg w-full"
                />
              </div>

              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    className="w-full p-2 placeholder-gray-400 focus:outline-none rounded"
                    placeholder="Email Address"
                    onChange={(e) => {
                      handleInputChange("email", e.target.value);
                      field.onChange(e);
                    }}
                  />
                )}
              />
              <div className="relative">
                {" "}
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "password required",
                    pattern: {
                      message: "Invalid password format",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className="w-full p-2 placeholder-gray-400 focus:outline-none rounded"
                      placeholder="Enter Your Password"
                      onChange={(e) => {
                        handleInputChange("password", e.target.value);
                        field.onChange(e);
                      }}
                    />
                  )}
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

              <div className="flex gap-2 items-center">
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
              <button
                type="submit"
                disabled={!allFieldsFilled || !isCheckboxChecked}
                className={`w-full p-2 text-white rounded ${
                  allFieldsFilled && isCheckboxChecked
                    ? "bg-cyan-500 hover:bg-cyan-600"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
              >
                Sign Up
              </button>
              <SocialLogin />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
