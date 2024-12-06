import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { createContext, useContext } from "react";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/jobs");
     
    return { data };
  } catch (error) {
    console.log(error);

    return error?.response?.data?.msg;
  }
};

const AllJobsContext = createContext();

function AllJobs() {
  const { data } = useLoaderData();

  return (
    <section>
      <AllJobsContext.Provider value={{ data }}>
        <SearchContainer />
        <JobsContainer />
      </AllJobsContext.Provider>
    </section>
  );
}

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
