"use client";

import { AccountSettings } from "@/context/ContextAccountSettings";
import {
  BarList,
  DonutChart,
  Bold,
  Card,
  Flex,
  Text,
  Title,
} from "@tremor/react";
import { useContext } from "react";

export const BarListAssetBreakDown = () => {
  const AccountContext = useContext(AccountSettings);
  const { stats } = AccountContext;
  const renders = stats.Count; 
  const data = [
    {
      name: "Total",
      value: renders.downloads ?? 0,
    },
    {
      name: "Videos",
      value: renders.assetCategoryCounts["Video options"] ?? 0,
    },
    {
      name: "Images",
      value: renders.assetCategoryCounts["Image options"] ?? 0,
    },
    {
      name: "Writeups",
      value: renders.aiReports ?? 0,
    },
  ];

  return (
    <Card className="max-w-md">
      <Title>Media Types</Title>
      <Flex className="mt-4">
        <Text>
          <Bold>Type</Bold>
        </Text>
        <Text>
          <Bold>Items</Bold>
        </Text>
      </Flex>
      <BarList data={data} className="mt-2" />
    </Card>
  );
};

export const PieAssetDivide = () => {
  const AccountContext = useContext(AccountSettings);
  const { stats } = AccountContext;
  const renders = stats.Count;

  const ARR = [];
  Object.keys(renders.assetGrouping).map((key, i) => {
    ARR.push({
      name: key,
      Items: renders.assetGrouping[key] ?? 0,
    });
  });
  return (
    <Card className="max-w-md">
      <Title>Asset distribution</Title>
      <DonutChart
        className="mt-6"
        data={ARR}
        category="Items"
        index="name"
        colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
      />
    </Card>
  );
};
