import React, { useEffect, useState } from "react";
import {
  AiOutlineMessage,
  AiOutlineSearch,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdNotifications, MdOutlineNotifications } from "react-icons/md";
import useAuth from "../Hooks/useAuth";
import { FaBars, FaCircleUser, FaUser } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { loadUsersData, usersData } from "../Hooks/userData";
import { Link } from "react-router-dom";
const Heading = ({ currentUserId, toggleSidebar }) => {
  // console.log(currentUserId);
  const [localUsersData, setLocalUsersData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await loadUsersData();
      setLocalUsersData(usersData);
    };
    fetchData();
  }, []);
  const matchedUser = localUsersData.find((user) => user._id === currentUserId);
  // console.log(matchedUser);

  const { user, logOut } = useAuth();
  // console.log(user);
  const [open, setOpen] = useState(false);
  const toggleBar = () => {
    setOpen(!open);
  };
  const handleLogOut = () => {
    logOut();
  };
  return (
    <div className="md:w-[75%] w-[100%]  ml-auto z-50">
      <div
        className="flex z-10 bg-[#10202B] fixed w-[100%] md:w-[75%] text-gray-100  items-center px-5 py-3 justify-between"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.1) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
        }}
      >
        <button className="md:hidden pl-2 pr-2" onClick={toggleSidebar}>
          <FaBars />
        </button>

        <div className="md:flex hidden gap-2 items-center ">
          <AiOutlineSearch className="w-7 h-7" color="#64748b" />
          <input
            type="text"
            name=""
            className="w-full text-gray-100 focus:outline-none bg-[#10202B] text-base"
            id=""
            placeholder="Type to search..."
          />
        </div>
        <div className="flex items-center gap-4 md:space-x-5 space-x-0">
          <MdOutlineNotifications className="w-7 h-7" color="#64748b" />
          <AiOutlineMessage className="w-6 h-6" color="#64748b" />
          <div className="text-end">
            <h2 className="font-semibold">{matchedUser?.name}</h2>
            <p className="font-light">Web Designer</p>
          </div>
          <div className="flex items-center gap-2 relative" onClick={toggleBar}>
            <div className={`flex items-center gap-2 ${open ? "" : ""}`}>
              {user.photoURL ? (
                <>
                  <img
                    src={user?.photoURL}
                    className="w-12 h-12 rounded-full"
                    alt=""
                  />
                </>
              ) : (
                <>
                  <FaCircleUser className="w-12 h-12" />
                </>
              )}

              <IoMdArrowDropdown
                className={`w-8 h-8 ${open ? "rotate-180" : ""}`}
              />
            </div>

            <div
              className={`dropdown-content  rounded-lg  absolute right-0 mt-56 ${
                open ? "show" : ""
              }`}
            >
              <Link>
                <div className="flex items-center gap-3 px-5 py-3 hover:bg-cyan-200">
                  <FaUser size={22} color="gray" />
                  <h2 className="text-base font-medium transition-colors 3s ease-in-out hover:text-gray-800 text-gray-500 ">
                    My Profile
                  </h2>
                </div>
              </Link>
              <div className="flex mb-2 items-center gap-3 px-5 py-3 hover:bg-cyan-200">
                <AiOutlineSetting size={22} color="gray" />
                <h2 className="text-base font-medium transition-colors 3s ease-in-out hover:text-gray-800 text-gray-500 ">
                  My Setting
                </h2>
              </div>
              <hr className="border border-gray-300  w-full" />
              <div
                onClick={handleLogOut}
                className="flex mt-2 items-center gap-3 px-5 py-3 hover:bg-cyan-200"
              >
                <BiLogOut size={22} color="gray" />
                <h2 className="text-base font-medium transition-colors 3s ease-in-out hover:text-gray-800 text-gray-500 ">
                  Log OUt
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heading;
