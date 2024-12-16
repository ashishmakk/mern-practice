
function StatsContainer({ defaultStats }) {
  console.log(defaultStats);

  const statsArray = [
    {
      title: "pending applications",
      count: defaultStats?.pending || 0,
    },
    {
      title: "upcoming interview",
      count: defaultStats?.interview || 0,
    },
    {
      title: "application declined",
      count: defaultStats?.declined || 0,
    },
  ];

  return (
    <section>
      <h2 className="text-center">Application Stats</h2>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-4 lg:gap-x-8 md:flex-row mt-6 md:mt-8 lg:max-w-[75vw]'>
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
