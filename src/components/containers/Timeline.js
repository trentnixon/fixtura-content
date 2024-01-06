"use client";
import { Timeline } from "@mantine/core";
export const FixturaTimeline = (props) => {
  const { children } = props;
  return (
    <Timeline color="indigo" radius="xs" active={1} bulletSize={30} align="right">
      {children}
    </Timeline>
  );
};
