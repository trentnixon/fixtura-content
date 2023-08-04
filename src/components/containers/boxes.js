"use client";
import { Box } from "@mantine/core";

export const FixturaBox = (props) => {
  const { c = 2, baseColor = "gray", w = "auto", p='sm' } = props;
  return (
    <Box
      sx={(theme) => ({
        width: w,
        backgroundColor: theme.colors[baseColor][c],
        textAlign: "left",
        padding: theme.spacing[p],
        borderRadius: theme.radius.sm,
      })}
    >
      {props.children}
    </Box>
  );
};



export const FixturaCategoryBox = (props) => {
  const { color = "blue", c = 5 } = props;
  return (
    <Box
      sx={(theme) => ({
        /* background: theme.fn.linearGradient(
          180,
          theme.colors.gray[3],
          theme.colors.gray[c]
        ), */
        backgroundColor: theme.colors[color][c],
        textAlign: "left",
        padding: theme.spacing.sm,
        borderRadius: theme.radius.sm,
      })}
    >
      {props.children}
    </Box>
  );
};

export const ArticleMetaBox = (props) => {
  const { c = 2, baseColor = "gray", w = "auto", p='sm', border='borderLeft' } = props;
  return (
    <Box
      sx={(theme) => ({
        width: w,
        [border]: `10px solid ${theme.colors[baseColor][c]}`,
        textAlign: "left",
        padding: theme.spacing[p],
        borderRadius: theme.radius.sm,
      })}
    >
      {props.children}
    </Box>
  );
};

export const FixturaArticleBox = (props) => {
  const {
    c = 0,
    baseColor = "gray",
    w = "auto",
    p = "md",
    my = "md",
    mx = "md",
  } = props;
  return (
    <Box
      my={my}
      mx={mx}
      sx={(theme) => ({
        backgroundColor: theme.colors[baseColor][c],
        textAlign: "left",
        width:w,
        padding: theme.spacing[p],
        borderRadius: theme.radius.sm,
        border: `1px solid ${theme.colors.gray[1]}`,
      })}
    
    >
      {props.children}
    </Box>
  );
};

// Custom Boxes

// Account Page
export const FixturaAccountBox = (props) => {
  const { children, my = 0, py = 10, mx='md', px=`md` } = props;
  return (
    <Box
      my={my}
      mx={mx}
      py={py}
      px={px}
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[0],
        textAlign: "left",
        padding: theme.spacing.sm,
        
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
