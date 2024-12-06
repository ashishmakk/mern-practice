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
    <section className="mt-4">
      <h2>All Jobs</h2>
      <div className="mt-4 grid md:grid-cols-2 gap-x-6 gap-y-6">
        {allJobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </section>
  );
}

export default JobsContainer;
