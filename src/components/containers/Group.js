"use client";
import { Group } from "@mantine/core";

export const FixturaGroup = (props) => {
  const { position = "apart",mt=0, my = 0, mx = 0, py = 0, px = 0, grow=false, w='auto' } = props;
  return (
    <Group position={position} mt={mt} my={my} mx={mx} py={py} px={px} grow={grow} w={w}>
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
