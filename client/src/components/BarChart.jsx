import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function BarChartContainer({ data }) {
  return (
    <div className='mt-10'>
      <ResponsiveContainer width='100%' height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray='2 2' />
          <XAxis dataKey='date' />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey='count' fill='#6671e5' barSize={65} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartContainer;
