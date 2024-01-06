"use client";
import { Paper } from "@mantine/core";

export const FixturaPaper = (props) => {
  const { mx = 0, my = 0, c = 0, shadow = "xs", p = "md" } = props;
  return (
    <Paper
      shadow={shadow}
      p={p}
      mx={mx}
      my={my}
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[c],
      })}
    >
      {props.children}
    </Paper>
  );
};
