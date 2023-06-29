"use client";
import { FixturaPaper } from "@/components/containers/paper";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
const data = [
  { name: "Page A", uv: 400, pv: 2700, amt: 2400 },
  { name: "Page b", uv: 700, pv: 2400, amt: 2400 },
  { name: "Page c", uv: 800, pv: 2700, amt: 2400 },
];

export const RenderLineChart = () => {
  return (
    <FixturaPaper>
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </FixturaPaper>
  );
};
 