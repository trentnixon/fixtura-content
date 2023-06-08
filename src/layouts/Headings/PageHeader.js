"use client";
import { H } from "@/components/Type/Headers";
import { FixturaGroup } from "@/components/containers/Group";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaContainer } from "@/components/containers/containers";
import { Group } from "@mantine/core";
import { IconCategory2 } from "@tabler/icons-react";

export const FixturaPageHeader = (props) => {
  const { heading, subheading } = props;
  return (
    <FixturaContainer>
      <FixturaGroup>
        <FixturaBox>
          <Group>
            <IconCategory2 />
            <H size="h3">{subheading} </H>
          </Group>
        </FixturaBox>

        <H size="h5">{heading}</H>
      </FixturaGroup>
    </FixturaContainer>
  );
};
