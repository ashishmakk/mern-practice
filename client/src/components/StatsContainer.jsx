import { FaUserCircle } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa6";

function StatsContainer({ defaultStats }) {
  console.log(defaultStats);

  const statsArray = [
    {
      title: "pending applications",
      count: defaultStats?.pending,
    },
    {
      title: "upcoming interview",
      count: defaultStats?.interview,
    },
    {
      title: "application declined",
      count: defaultStats?.declined,
    },
  ];

  return (
    <section>
      <h2>Application Stats</h2>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 lg:gap-x-8 md:flex-row mt-6 md:mt-8 lg:max-w-[75vw]'>
        {statsArray.map((item) => {
          return (
            <div className='bg-[#f2f2f2] rounded shadow flex gap-y-2 flex-col p-8'>
              <h4 className='font-bold text-4xl md:text-5xl text-[#6671e5]'>
                {item.count}
              </h4>
              <h4 className='text-xl md:text-2xl'>{item.title}</h4>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default StatsContainer;
