import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { GiTeacher } from "react-icons/gi";
import Heading from "./Heading";
import { FaCircleUser, FaUser } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import useAdmin from "../Hooks/useAdmin";
import { loadUsersData, usersData } from "../Hooks/userData";
import useAuth from "../Hooks/useAuth";
import { FaBookmark } from "react-icons/fa";

const Sidebar = () => {
  const [isAdmin] = useAdmin();
  // console.log(isAdmin);
  const { user } = useAuth();
  const userEmail = user.email;
  const [localUsersData, setLocalUsersData] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await loadUsersData();
      setLocalUsersData(usersData);
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (localUsersData.length) {
      const matchedUser = localUsersData.find(
        (user) => user.email === userEmail
      );
      if (matchedUser) {
        setCurrentUserId(matchedUser._id);
      }
    }
  }, [localUsersData, userEmail]);
  // console.log(currentUserId);
  const activeLinkClass =
    "bg-gradient-to-tr from-cyan-600 to-cyan-400 shadow-md shadow-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/40";
  return (
    <div className="flex ">
      <div className="bg-[#263238] w-1/4 h-screen fixed">
        {/* Header */}
        <div className="border-b border-white/20">
          <Link to={"/"}>
            <h5 className="text-xl font-semibold text-white text-center pt-6 pb-5">
              Your Logo
            </h5>
          </Link>
        </div>
        {/* Left side Content */}
        <div className="px-5 pt-10 space-y-3">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `font-semibold transition-all disabled:opacity-50 hover:bg-gray-700 disabled:shadow-none disabled:pointer-events-none text-base py-3 rounded-lg  text-white active:opacity-[0.85] w-full flex items-center gap-4 px-5 capitalize ${
                isActive ? activeLinkClass : ""
              }`
            }
          >
            <ImHome className="w-5 h-5" />
            <span className="">Dashboard</span>
          </NavLink>
          <NavLink
            to={`../dashboard/profile/${currentUserId}`}
            className={({ isActive }) =>
              `font-semibold transition-all disabled:opacity-50 hover:bg-gray-700 disabled:shadow-none disabled:pointer-events-none text-base py-3 rounded-lg  text-white active:opacity-[0.85] w-full flex items-center gap-4 px-5 capitalize ${
                isActive ? activeLinkClass : ""
              }`
            }
          >
            <FaUser className="w-5 h-5" />
            <span>Profile</span>
          </NavLink>

          {isAdmin && (
            <>
              <NavLink
                to="instructor-Details"
                className={({ isActive }) =>
                  `font-semibold transition-all disabled:opacity-50 hover:bg-gray-700 disabled:shadow-none disabled:pointer-events-none text-base py-3 rounded-lg  text-white active:opacity-[0.85] w-full flex items-center gap-4 px-5 capitalize ${
                    isActive ? activeLinkClass : "text-white"
                  }`
                }
              >
                <GiTeacher className="w-5 h-5" />
                <span>Instructor</span>
              </NavLink>
              <NavLink
                to="manage-users"
                className={({ isActive }) =>
                  `font-semibold transition-all disabled:opacity-50 hover:bg-gray-700 disabled:shadow-none disabled:pointer-events-none text-base py-3 rounded-lg  text-white active:opacity-[0.85] w-full flex items-center gap-4 px-5 capitalize ${
                    isActive ? activeLinkClass : "text-white"
                  }`
                }
              >
                <FaCircleUser className="w-5 h-5" />
                <span>Manage User</span>
              </NavLink>
              <NavLink
                to="manage-students"
                className={({ isActive }) =>
                  `font-semibold transition-all disabled:opacity-50 hover:bg-gray-700 disabled:shadow-none disabled:pointer-events-none text-base py-3 rounded-lg  text-white active:opacity-[0.85] w-full flex items-center gap-4 px-5 capitalize ${
                    isActive ? activeLinkClass : "text-white"
                  }`
                }
              >
                <PiStudentFill className="w-5 h-5" />
                <span>Manage Student</span>
              </NavLink>
            </>
          )}
          {!isAdmin && (
            <>
              <NavLink
                to="bookmark"
                className={({ isActive }) =>
                  `font-semibold transition-all disabled:opacity-50 hover:bg-gray-700 disabled:shadow-none disabled:pointer-events-none text-base py-3 rounded-lg  text-white active:opacity-[0.85] w-full flex items-center gap-4 px-5 capitalize ${
                    isActive ? activeLinkClass : "text-white"
                  }`
                }
              >
                <FaBookmark className="w-5 h-5" />
                <span>Book Mark</span>
              </NavLink>
            </>
          )}
        </div>
      </div>
      <div className="flex-1">
        {/* Heading */}
        <Heading currentUserId={currentUserId} />
        <div className=" w-3/4 ml-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
