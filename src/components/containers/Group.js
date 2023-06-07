"use client"
import { Group, Button } from '@mantine/core';

export const FixturaGroup = ({children, position='apart'}) => {
  return (
    <Group position={position}>
     {children}
    </Group>
  );
}