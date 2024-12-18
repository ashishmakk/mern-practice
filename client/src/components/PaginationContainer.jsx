import { useAllJobsContext } from "../pages/AllJobs";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

function PaginationContainer() {
  const { data } = useAllJobsContext();
  const { totalJobs, totalPages, currentPage, allJobs } = data;

  const pageArr = Array.from({ length: totalPages }, (_, index) => index + 1);
  const navigate = useNavigate();

  const { search, pathname } = useLocation();

  const handlePageChange = (pageNum) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNum);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <div className='mt-8 flex justify-end gap-x-2'>
      <button
        type='button'
        className='arrow-btn'
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) {
            prevPage = totalPages;
          }
          handlePageChange(prevPage);
        }}
      >
        <FaArrowLeft />
      </button>
      <div className='flex gap-x-1'>
        {pageArr.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              className={`page-btn font-medium md:text-lg`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button
        type='button'
        className='arrow-btn'
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > totalPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        <FaArrowRight />
      </button>
    </div>
  );
}

export default PaginationContainer;
