"use client";

import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaPaper } from "@/components/containers/paper";
import { Retheme } from "./theme";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const BarChartCategoryType = ({ Count }) => {
  console.log(Count);
  const data = [
    {
      name: "Articles",
      results: Count?.finalStructure?.articles?.results ?? 0,
      statistics: Count?.finalStructure?.articles?.statistics ?? 0,
      upcoming: Count?.finalStructure?.articles?.upcoming ?? 0,
    },
    {
      name: "Media",
      results: Count?.finalStructure?.media?.results ?? 0,
      statistics: Count?.finalStructure?.media?.statistics ?? 0,
      upcoming: Count?.finalStructure?.media?.upcoming ?? 0,
    },
  ];

  return (
    <>
      <H size={"h5"}>Category</H>
      <FixturaBox c={0}>
        <FixturaPaper>
          <P fz={"sm"}>
            The bar chart 
          </P>
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 30,
                  right: 0,
                  left: 0,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="results" fill={Retheme.colors[3]} radius={5} />
                <Bar dataKey="statistics" fill={Retheme.colors[4]} radius={5} />
                <Bar dataKey="upcoming" fill={Retheme.colors[5]} radius={5} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </FixturaPaper>
      </FixturaBox>
    </>
  );
};
