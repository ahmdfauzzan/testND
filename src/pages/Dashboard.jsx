import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Navbar } from "../components/Navbar";

const barData = [
  { label: "Label 1", Category1: 40, Category2: 24, Category3: 35 },
  { label: "Label 2", Category1: 30, Category2: 50, Category3: 20 },
  { label: "Label 3", Category1: 20, Category2: 18, Category3: 45 },
  { label: "Label 4", Category1: 27, Category2: 35, Category3: 25 },
];

const pieData = [
  { name: "Label 1", value: 400 },
  { name: "Label 2", value: 300 },
  { name: "Label 3", value: 300 },
  { name: "Label 4", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart Box */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Bar Chart</h2>
          <div className="w-full h-72 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Category1" fill="#8884d8" />
                <Bar dataKey="Category2" fill="#82ca9d" />
                <Bar dataKey="Category3" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart Box */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Pie Chart</h2>
          <div className="w-full h-72 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
