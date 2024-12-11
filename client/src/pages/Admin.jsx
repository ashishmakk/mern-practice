import customFetch from "../utils/customFetch";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa6";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/admin/app-stats");

    return data;
  } catch (error) {
    toast.error("Only admin user can access this route");
    return redirect("/dashboard");
  }
};

function Admin() {
  const { users, jobs } = useLoaderData();
  
  return (
    <section>
      <h2>Application Stats</h2>
      <div className='flex flex-col gap-8 md:flex-row'>
        <div className='bg-[#f2f2f2] rounded shadow flex flex-col justify-center items-center w-[50vw] md:w-52 p-8 lg:w-72 mt-6 md:mt-8'>
          <p>
            <FaUserCircle className='mb-4 h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12' />
          </p>
          <h4>{`total users: ${users}`}</h4>
        </div>
        <div className='bg-[#f2f2f2] rounded shadow flex flex-col justify-center items-center w-[50vw] md:w-52 p-8 lg:w-72 mt-0 md:mt-8'>
          <p>
            <FaBriefcase className='mb-4 h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12' />
          </p>
          <h4>{`total jobs: ${jobs}`}</h4>
        </div>
      </div>
    </section>
  );
}

export default Admin;
