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
    <section className='mt-8 md:mt-10'>
      <hr className='mb-6' />
      <h4 className='font-medium'>
        total {data.totalJobs} job{data.totalJobs > 1 && "s"}
      </h4>
      <div className='mt-6 grid md:grid-cols-2 gap-x-6 gap-y-6'>
        {allJobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </section>
  );
}

export default JobsContainer;
