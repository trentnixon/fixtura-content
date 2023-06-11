"use client";
import { Box } from "@mantine/core";

export const  FixturaBox = ({children}) => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor:theme.colors.teal[1],
        textAlign: "left",
        padding: theme.spacing.sm,
        borderRadius: theme.radius.md,
      })}
    >
      {children}
    </Box>
  );
}
