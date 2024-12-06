import React, { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import MobileSidebar from "../components/MobileSidebar";
import DesktopSidebar from "../components/DesktopSidebar";
import Navbar from "../components/Navbar";

const DashboardContext = createContext();

function DashboardLayout() {
  const user = { name: "ashish" };
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const logoutUser = async () => {
    console.log("logout user");
  };

  return (
    <DashboardContext.Provider
      value={{ user, sidebarOpen, setSidebarOpen, toggleSidebar, logoutUser }}
    >
      <main
        className={
          sidebarOpen
            ? "grid grid-cols-1"
            : "grid grid-cols-1 md:grid-cols-[auto_1fr]"
        }
      >
        <MobileSidebar />
        <DesktopSidebar />
        <div>
          <Navbar />
          <div className='mx-auto p-8'>
            <Outlet />
          </div>
        </div>
      </main>
    </DashboardContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(DashboardContext);
};

export default DashboardLayout;
