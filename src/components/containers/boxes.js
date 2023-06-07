"use client";
import { Box } from "@mantine/core";

export const  FixturaBox = ({children}) => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        textAlign: "left",
        padding: theme.spacing.sm,
        borderRadius: theme.radius.md,
    

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[5]
              : theme.colors.gray[1],
        },
      })}
    >
      {children}
    </Box>
  );
}
