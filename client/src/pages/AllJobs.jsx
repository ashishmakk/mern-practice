import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { createContext, useContext } from "react";

export const loader = async ({ request }) => {
  
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
 
  console.log(params);
  
  try {
    const { data } = await customFetch.get("/jobs", { params });

    return { data, searchValues: {...params} };
  } catch (error) {
    console.log(error);

    return error?.response?.data?.msg;
  }
};

const AllJobsContext = createContext();

function AllJobs() {
  const { data, searchValues } = useLoaderData();

  return (
    <section>
      <AllJobsContext.Provider value={{ data, searchValues }}>
        <SearchContainer />
        <JobsContainer />
      </AllJobsContext.Provider>
    </section>
  );
}

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
