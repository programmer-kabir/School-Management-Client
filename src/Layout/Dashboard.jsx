import React, { useEffect, useState } from "react";
import Sidebar from "../Component/Dashboard/Sidebar";
import { Outlet,  } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <Sidebar />
    </>
  );
};

export default Dashboard;
