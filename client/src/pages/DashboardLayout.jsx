import { createContext, useContext, useState } from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import MobileSidebar from "../components/MobileSidebar";
import DesktopSidebar from "../components/DesktopSidebar";
import Navbar from "../components/Navbar";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const response = await customFetch.get("/users/current-user");
    const data = response.data;
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardContext = createContext();

function DashboardLayout() {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logged out successfully");
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
            <Outlet context={{ user }} />
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
