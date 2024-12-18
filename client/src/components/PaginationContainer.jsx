import React from "react";
import { useAllJobsContext } from "../pages/AllJobs";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

function PaginationContainer() {
  const { data } = useAllJobsContext();
  const { totalJobs, totalPages, currentPage, allJobs } = data;

  const pageArr = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className='mt-8 flex'>
      <button type='button' className='arrow-btn'>
        <FaArrowLeft />
      </button>
      <div>
        {pageArr.map((item) => {
          return (
            <button
              className={`page-btn ${
                item === currentPage ? "active-btn" : ""
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
      <button type='button' className='arrow-btn'>
        <FaArrowRight />
      </button>
    </div>
  );
}

export default PaginationContainer;
