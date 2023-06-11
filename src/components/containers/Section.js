"use client";
import { H } from "@/components/Type/Headers";
import { Box, Stack } from "@mantine/core";

export const FixturaSection = (props) => {
  const { shade = 2, Title = "" } = props;
  return (
    <Stack>
      <H size="h4" align="left">
        {Title}
      </H>
      <Box
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[shade],
          padding: theme.spacing.sm,
          borderRadius: theme.radius.sm,
          marginBottom: theme.spacing.xl,
        })}
      >
        {props.children}
      </Box>
    </Stack>
  );
};
