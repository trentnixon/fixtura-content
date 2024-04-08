"use client";
import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
//import { BUTTON_FUNC } from "@/components/UI/buttons";
import { FixturaComponent } from "@/components/containers/containers";
import { FixturaPaper } from "@/components/containers/paper";
//import { Group } from "@mantine/core";

export const NoDataFound = () => {
  return (
    <FixturaComponent>
      <H size="h2">No Assets Found</H>
      <FixturaPaper c={1} shadow={"none"} my={20}>
        <P>
          It looks like we&#39;ve hit a snag and can&#39;t find the data
          you&#39;re looking for.
        </P>
        <P>
          This could be because the necessary details are missing from your
          fixtures from PlayHQ, or there&#39;s been a hiccup in bringing this
          category to life.
        </P>
      </FixturaPaper>

      {/* <Group>
        <BUTTON_FUNC Label="Re-render" />
        <BUTTON_FUNC Label="Contact" />
      </Group> */}
    </FixturaComponent>
  );
};
