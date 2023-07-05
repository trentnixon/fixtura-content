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

export const BarChartArticleType = ({ Count }) => {
  //console.log(Count);
  const data = [
    {
      name: "RESULTS",
      total: Count.finalStructure.results,
      media: Count.finalStructure.media.results,
      articles: Count.finalStructure.articles.results,
    },
    {
      name: "UPCOMING",
      total: Count.finalStructure.upcoming,
      media: Count.finalStructure.media.upcoming,
      articles: Count.finalStructure.articles.upcoming,
    },
    {
      name: "STATISTICS",
      total: Count.finalStructure.statistics,
      media: Count.finalStructure.media.statistics,
      articles: Count.finalStructure.articles.statistics,
    },
  ];

  return (
    <>
      <H size={"h5"}>Category Breakdown by Asset Type</H>
      <FixturaBox c={0}>
        <FixturaPaper>
          <P fz={"sm"}>
            The bar chart provides a visual representation of the category
            breakdown of assets, showing the total count of results, upcoming
            content, and statistics, as well as the distribution between media
            and articles within each category.
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
                <Bar dataKey="total" fill={Retheme.colors[0]} radius={5} />
                <Bar dataKey="articles" fill={Retheme.colors[1]} radius={5} />
                <Bar dataKey="media" fill={Retheme.colors[2]}  radius={5} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </FixturaPaper>
      </FixturaBox>
    </>
  );
};