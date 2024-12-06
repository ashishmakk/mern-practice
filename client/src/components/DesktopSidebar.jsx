import React from "react";
import { useGlobalContext } from "../pages/DashboardLayout";
import links from "../utils/links";
import { NavLink } from "react-router-dom";

function DesktopSidebar() {
  const { sidebarOpen } = useGlobalContext();

  return (
    <section
      className={
        sidebarOpen
          ? "hidden"
          : "hidden px-6 bg-[#f2f2f2] md:h-[100vh] md:block"
      }
    >
      <div className='mt-6 grid grid-rows-[auto_1fr] gap-y-8'>
        <h2 className='text-2xl text-center font-semibold tracking-wider uppercase text-[#181818]'>
          MERN JOB PORTAL
        </h2>
      </div>
      <div className='flex flex-col gap-y-2 mt-10'>
        {links.map((item) => {
          const { path, icon, text } = item;

          return (
            <NavLink
              to={path}
              end
              className='menu-item flex items-center gap-y-2 gap-x-3 text-xl capitalize rounded'
            >
              {icon}
              {text}
            </NavLink>
          );
        })}
      </div>
    </section>
  );
}

export default DesktopSidebar;
