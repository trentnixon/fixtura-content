"use client";

import { Text, Avatar } from "@mantine/core";
import { Timeline } from "@mantine/core";

export function DeveloperComment({ Copy, Title }) {
  return (
    <Timeline.Item
      bullet={
        <Avatar
          src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Logo_Blue_on_transparent_0e86187b28.png"
          alt="Admin"
          radius="md"
        />
      }
      title={Title}
    >
      <Text color="dimmed" size="sm">
        {Copy}
      </Text>
      <Text size="xs" mt={4}>
        Admin
      </Text>
    </Timeline.Item>
  );
}
