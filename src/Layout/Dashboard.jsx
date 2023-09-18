import React, { useState } from "react";
import { ImHome } from "react-icons/im";
import Sidebar from "../Component/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const activeLinkClass =
    "bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40";
  const tabs = [
    {
      label: "dashboard",
      icon: <ImHome className="w-5 h-5" />,
      content: "Dashboard Content Here",
    },
    {
      label: "profile",
      icon: <ImHome className="w-5 h-5" />,
      content: "Profile Content Here",
    },
  ];
  return (
    <>
      <Sidebar />
    </>
  );
};

export default Dashboard;
