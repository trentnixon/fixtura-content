"use client";
import { Title } from "@mantine/core";

export const H = (props) => {
  const {
    weight = "700",
    align = "left",
    underline = false,
    color = "gray.7",
    italic = false,
    size = "h1",
    mx = 0,
    my = 0,
    lh=`1.5em`
  } = props;

  return (
    <Title
      size={size}
      weight={weight}
      align={align}
      underline={underline}
      color={color}
      italic={italic}
      mx={mx}
      my={my}
      lh={lh}
    >
      {props.children}
    </Title>
  );
};
