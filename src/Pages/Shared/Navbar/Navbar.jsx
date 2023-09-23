import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from "react-icons/hi";
import useAuth from "../../../Component/Hooks/useAuth";
import logo from '../../../assets/Image/logo.gif'
const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logOut, loading } = useAuth();
  const location = useLocation();

  const handleNav = () => {
    setNav(!nav);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/" && window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);


  const linksData = [
    {
      to: "/",
      text: "Home",
    },
    {
      to: "/all-class",
      text: "Class",
    },
    {
      to: "/favorite",
      text: "Favorite",
    },
    ...(user
      ? [
          {
            to: "/dashboard",
            text:"Dashboard"
          },
        ]
      : [
          {
            to: "/login",
            text: "Login",
          },
        ]),
  ];

  const activeLink = "bg-cyan-500 px-5 py-1 rounded-md";
  return (
    <div>
      <nav
       className={`w-[100%] fixed z-50 mx-auto ${location.pathname === "/" ? (scrolled ? "bg-[#10202B]" : "") : "bg-[#10202B]"} text-black`}
      >
        <div className=" mx-auto ">
          <div className="flex z-50 px-8  justify-between items-center text-white">
            <Link to="/" className="flex items-center gap-2">
              <img className=" w-16 pt-1" src={logo} alt="" />
              {/* <h2 className="text-2xl text-white font-bold">Programming Boss</h2> */}
            </Link>
            <div className="hidden md:flex gap-8 items-center font-medium p-4">
              {/* {linksData.map((link, index) => (
                <NavLink
                  key={index}
                  to={link?.to}
                  className={({ isActive }) => (isActive ? activeLink : "")}
                >
                  {link?.text}
                </NavLink>
              ))} */}
              {linksData.map((link, index) => {
                // Check if the link has an onClick (for Logout)
                if (link.onClick) {
                  return (
                    <button
                      key={index}
                      onClick={link.onClick}
                      className="text-white hover:text-red-500"
                    >
                      {link.text}
                    </button>
                  );
                } else {
                  return (
                    <NavLink
                      key={index}
                      to={link.to}
                      className={({ isActive }) => (isActive ? activeLink : "")}
                    >
                      {link.text}
                    </NavLink>
                  );
                }
              })}
            </div>

            <div onClick={handleNav} className="block  md:hidden">
              {nav ? (
                <HiOutlineMenuAlt3 size={20} className="" />
              ) : (
                <div className="flex items-center gap-2 font-semibold">
                  <HiOutlineMenuAlt2 size={20} className="" />
                </div>
              )}
            </div>
            <div
              className={
                nav
                  ? "fixed left-0 top-0 w-[80%] h-full px-6 text-center border-r md:hidden border-r-gray-900 bg-[#000300] ease-in-out duration-500"
                  : "ease-in-out duration-500 fixed left-[-100%]"
              }
            >
              <div className="flex flex-col p-0 gap-5 text-white">
                <h1 className="w-full text-start text-3xl font-bold text-[#00df9a] m-4">
                  <Link to="/">REACT.</Link>
                </h1>
                {linksData.map((link, index) => (
                  <NavLink
                    key={index}
                    to={link.to}
                    className={({ isActive }) => (isActive ? activeLink : "")}
                  >
                    {link.text}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
