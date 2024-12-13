import { useGlobalContext } from "../pages/DashboardLayout";
import { FaAlignLeft } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const { user, toggleSidebar, logoutUser } = useGlobalContext();

  return (
    <section className='flex sticky top-0 justify-center items-center bg-[#f2f2f2] py-4 md:py-6 '>
      <div className='flex w-[95%] justify-between'>
        <button type='button' onClick={toggleSidebar}>
          <FaAlignLeft className='w-6 h-6 text-[#181818]' />
        </button>
        <h2 className=' text-2xl font-semibold tracking-wider uppercase text-[#181818]'>
          DASHBOARD
        </h2>
        <div className='flex items-center gap-x-3 text-[#181818]'>
          <div className='flex items-center gap-x-2'>
            {user.avatar ? (
              <img
                src={user.avatar}
                alt='avatar'
                className='rounded-full object-cover w-6 h-6 md:h-8 md:w-8 '
              />
            ) : (
              <FaUserCircle className='w-4 h-auto md:w-10 md:h-6' />
            )}
            <p className=' capitalize'>Hello, {user.name}</p>
          </div>
          <button type='button' className='btn' onClick={logoutUser}>
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}

export default Navbar;
