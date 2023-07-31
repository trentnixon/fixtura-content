"use client";
import { usePathname } from "next/navigation";

import { H } from "@/components/Type/Headers";
import { FixturaGroup } from "@/components/containers/Group";

import {
  IconCalendarDue,
  IconScoreboard,
  IconChartPie4,
  IconHome2
} from "@tabler/icons-react";

export const PageCategoryHeader = () => {
  const pathname = usePathname();
  const thirdItemInPath = pathname.split("/")[3];
  const myArray = [
    { id: undefined, title: "HOME", icon: <IconHome2 /> },
    { id: "r", title: "RESULTS", icon: <IconScoreboard /> },
    { id: "o", title: "STATISTICS", icon: <IconChartPie4 /> },
    { id: "u", title: "UPCOMING", icon: <IconCalendarDue /> },
  ];

  const matchingObject = myArray.find((obj) => obj.id === thirdItemInPath);
  const correspondingTitle = matchingObject ? matchingObject.title : "";

  return (
    <FixturaGroup>
      {matchingObject.icon}
      <H size="h3">{correspondingTitle}</H>
    </FixturaGroup>
  );
};
