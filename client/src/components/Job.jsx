import React from "react";
import { FaLocationArrow, FaCalendarAlt } from "react-icons/fa";
import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { FaBriefcase } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { IoFlagSharp } from "react-icons/io5";
import { Form, redirect, Link } from "react-router-dom";


function Job({_id, company, position, jobLocation, jobType, createdAt, jobStatus }) {
  
  dayjs.extend(advancedFormat);
   const date = dayjs().format('MMM Do, YYYY')

  return <article className="bg-[#f2f2f2] p-4 lg:p-6 shadow-md rounded ">
    <header className="flex gap-x-4 items-center">
      <div className=" uppercase bg-[#909090] rounded flex justify-center items-center text-[#f2f2f2] text-2xl lg:text-3xl font-bold w-12 h-12 lg:w-16 lg:h-16">
        {company.charAt(0)}</div>
      <div>
        <h4 className="font-medium">{company}</h4>
        <p className="capitalize text-[#535353]">{position}</p>
      </div>
    </header>
    <div className="mt-4 lg:mt-6 grid lg:grid-cols-2 gap-y-2">
      <p className="flex items-center text-base lg:text-lg gap-x-3 capitalize"><span><FaBriefcase /></span>
        {jobType}</p>
      <p className="flex items-center text-base lg:text-lg gap-x-3 capitalize"><span><FaLocationDot /></span>
        {jobLocation}</p>
        <p className="flex items-center text-base lg:text-lg gap-x-3 capitalize"><span><FaCalendarAlt /></span>
        {date}</p>
        <p className="flex items-center text-base lg:text-lg gap-x-3 capitalize"><span><IoFlagSharp /></span>
        {jobStatus}</p>
    </div>
    <footer className='flex gap-x-2 mt-3 lg:mt-4'>
    <Link to={`../edit-job/${_id}`} className='btn capitalize'>edit job</Link>
    <Form method="post" action={`../delete-job/${_id}`} >
    <button type='submit' className='delete-btn capitalize'>delete job</button>
    </Form>
    </footer>
  </article>;
}

export default Job;
