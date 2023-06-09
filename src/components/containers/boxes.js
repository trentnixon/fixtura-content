"use client";
import { Box } from "@mantine/core";

export const FixturaBox = (props) => {
  const { c = 2 } = props;
  return (
    <Box
      sx={(theme) => ({
        /* background: theme.fn.linearGradient(
          180,
          theme.colors.gray[3],
          theme.colors.gray[c]
        ), */
        backgroundColor:theme.colors.gray[c],
        textAlign: "left",
        padding: theme.spacing.sm,
        borderRadius: theme.radius.sm,
      })}
    >
      {props.children}
    </Box>
  );
};

export const FixturaCategoryBox = (props) => {
  const { color='blue', c=5 } = props;
  return (
    <Box
      sx={(theme) => ({
        /* background: theme.fn.linearGradient(
          180,
          theme.colors.gray[3],
          theme.colors.gray[c]
        ), */
        backgroundColor:theme.colors[color][c],
        textAlign: "left",
        padding: theme.spacing.sm,
        borderRadius: theme.radius.sm,
      })}
    >
      {props.children}
    </Box>
  );
};

export const FixturaArticleBox = (props) => {
  const { c = 0 } = props;
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[c],
        textAlign: "left",
        padding: theme.spacing.md,
        borderRadius: theme.radius.sm,
        border: `1px solid ${theme.colors.gray[1]}`,
      })}
      my={20}
    >
      {props.children}
    </Box>
  );
};

// Custom Boxes

// Account Page
export const FixturaAccountBox = (props) => {
  const { children, my = 0, py = 10 } = props;
  return (
    <Box
      my={my}
      py={py}
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[0],
        textAlign: "left",
        padding: theme.spacing.sm,
        marginBottom: "10px",
        borderBottom: `1px solid ${theme.colors.gray[3]}`,
      })}
    >
      {children}
    </Box>
  );
};
export const FixturaAccountLogoBox = (props) => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[0],
        textAlign: "left",
        padding: theme.spacing.sm,
        marginBottom: "10px",
        width: "100%",
        display: "flex",

        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      })}
    >
      {props.children}
    </Box>
  );
};
