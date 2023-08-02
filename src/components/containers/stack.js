"use client";
import { Stack } from "@mantine/core";
export const FixturaStack = (props) => {
  const {children, align='center',spacing="xs"}=props
  return <Stack align={align} spacing={spacing}>{children}</Stack>;
};
