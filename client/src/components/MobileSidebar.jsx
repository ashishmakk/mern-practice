import React from "react";
import { useGlobalContext } from "../pages/DashboardLayout";
import { NavLink } from "react-router-dom";
import links from "../utils/links";
import { IoCloseCircleSharp } from "react-icons/io5";

function MobileSidebar() {
  const { sidebarOpen, toggleSidebar } = useGlobalContext();

  return (
    <section
      className={
        sidebarOpen
          ? "block fixed bg-black/80 h-[100vh] w-[100vw] z-10 md:hidden"
          : "hidden"
      }
    >
      <div className='w-[90%] h-[90%] bg-white mx-auto mt-4 px-6 rounded-md'>
        <button type='button' onClick={toggleSidebar} className='text-red mt-6'>
          <IoCloseCircleSharp className='h-8 w-8 text-black' />
        </button>
        <div className='flex flex-col gap-y-4 mt-6'>
          {links.map((item) => {
            const { path, text, icon } = item;

            return (
              <NavLink
              key={text}
                to={path}
                className='flex items-center gap-x-2 text-xl hover:text-red-700'
                onClick={toggleSidebar}
                end
              >
                {icon}
                {text}
              </NavLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default MobileSidebar;
