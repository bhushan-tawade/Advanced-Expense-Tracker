import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function GraphComponent({ aggregatedData }) {
  return (
    <div className="GraphComponent bg-white rounded-2xl h-96 w-full pt-10 p-20  flex-col justify-center items-center">
      {aggregatedData.length > 0 ? (
        <>
          <h1 className="text-4xl font-black mb-5">Expense Analysis</h1>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={aggregatedData}
              margin={{
                top: 5,
                right: 30,
                left: 30,
                bottom: 5,
              }}
              barSize={50}
            >
              <XAxis
                dataKey="date"
                scale="point"
                padding={{ left: 50, right: 50 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="amount"
                fill="#6528f7"
                background={{ fill: "#eee" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </>
      ) : (
        <div className="h-96 w-full flex  items-center justify-center">
          <h1>Graph will appear here based on your transactions 📊</h1>
        </div>
      )}
    </div>
  );
}
