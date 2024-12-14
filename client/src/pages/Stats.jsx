import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { ChartsContainer, StatsContainer } from "../components";


export const loader = async () => {
  try {
    const { data } = await customFetch.get("/jobs/stats");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

function Stats() {
  const { defaultStats, monthlyApplications } = useLoaderData();

  return (
    <section>
      <StatsContainer defaultStats={defaultStats} name="maximus" />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer monthlyApplications={monthlyApplications} />
      )}
    </section>
  );
}

export default Stats;
