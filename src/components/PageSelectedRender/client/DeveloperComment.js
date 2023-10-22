"use client";
import { FixturaPaper } from "@/components/containers/paper";
import { Text, Avatar, Group } from "@mantine/core";
export function DeveloperComment({ Copy, Title }) {
  return (
    <div>
      <FixturaPaper my={20}>
        <Group>
          <Avatar
            src="https://fixtura.s3.ap-southeast-2.amazonaws.com/avatar_8c6df367b0.png"
            alt="Admin"
            radius="xl"
          />

          <div>
            <Text size="lg" fw={900}> {Title} </Text>
            <Text size="xs" c="dimmed">
              Admin
            </Text>
          </div>
        </Group>
        <Text pl={54} pt="md" size="md">
          {Copy}
        </Text>
      </FixturaPaper>
    </div>
  );
}
