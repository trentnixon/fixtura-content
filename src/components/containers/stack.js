"use client";
import { Stack } from "@mantine/core";
export const FixturaStack = (props) => {
  const {children, align='center'}=props
  return <Stack align={align}>{children}</Stack>;
};
