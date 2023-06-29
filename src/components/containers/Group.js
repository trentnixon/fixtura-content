"use client";
import { Group } from "@mantine/core";

export const FixturaGroup = (props) => {
  const { position = "apart", my = 0, mx = 0, py = 0, px = 0 } = props;
  return (
    <Group position={position} my={my} mx={mx} py={py} px={px}>
      {props.children}
    </Group>
  );
};

export const FixturaBtnGroup = (props) => {
  const { position = "right", my = 0, mx = 0 } = props;
  return (
    <Group position={position} my={my} mx={mx}>
      {props.children}
    </Group>
  );
};
