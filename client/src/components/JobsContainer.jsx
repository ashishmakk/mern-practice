import Job from "./Job";
import { useAllJobsContext } from "../pages/AllJobs";

function JobsContainer() {
  const { data } = useAllJobsContext();
  const { allJobs } = data;

  if (allJobs.length === 0) {
    return (
      <section>
        <h2>No jobs to display</h2>
      </section>
    );
  }

  return (
    <section>
      <h2>All Jobs</h2>
      {allJobs.map((job) => {
        return <Job key={job._id} {...job} />;
      })}
    </section>
  );
}

export default JobsContainer;
