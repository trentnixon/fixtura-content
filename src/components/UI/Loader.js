"use client";
import { H } from "@/components/Type/Headers";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaContainer } from "@/components/containers/containers";
import { FixturaPaper } from "@/components/containers/paper";
import { Center, Loader, Stack } from "@mantine/core";
export const FixturaLoader = () => {
  return (
    <FixturaContainer>
      <FixturaPaper>
        <FixturaBox>
          <Stack>
            <H size="h6" align='center'>Crunching the Numbers..</H>
            <Center>
              <Loader color="gray" size="xl" variant="dots" />{" "}
            </Center>
          </Stack>
        </FixturaBox>
      </FixturaPaper>
    </FixturaContainer>
  );
};


export const ProcessingLoader = ()=> <Loader color="gray" variant="dots" size="xl"  />