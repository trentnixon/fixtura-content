"use client";
import { H } from "@/components/Type/Headers";
import { FixturaGroup } from "@/components/containers/Group";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaContainer } from "@/components/containers/containers";
import { Group, Image } from "@mantine/core";
import { IconCategory2 } from "@tabler/icons-react";

export const FixturaPageHeader = (props) => {
  const { heading, subheading, Logo } = props;
  return (
    <FixturaContainer>
      <FixturaGroup>
        <FixturaBox>
          <Group> 
            <IconCategory2 />
            <H size="h4">{subheading} </H>
          </Group>
        </FixturaBox>

        <Group>
          <H size="h5">{heading}</H>
    
          <Image src={Logo} width={40} height={40} fit="contain" />
        </Group>
      </FixturaGroup>
    </FixturaContainer>
  );
};
