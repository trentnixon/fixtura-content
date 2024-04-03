"use client";

import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import { BUTTON_FUNC } from "@/components/UI/buttons";
import { FixturaComponent } from "@/components/containers/containers";
import { FixturaPaper } from "@/components/containers/paper";
import { Group } from "@mantine/core";

export const NoDataFound = () => {
  return (
    <FixturaComponent>
      <H size="h2">Asset Rendering Glitch</H>
      <FixturaPaper c={1} shadow={"none"} my={20}>
        <P>
          It looks like we've hit a snag and can't find the data you're looking
          for. This could be because the necessary details are missing from your
          fixtures from PlayHQ, or there's been a hiccup in bringing this
          category to life. But don't worry, we've got a couple of ways to get
          you back on track and ensure you have all the information you need to
          keep the game going.
        </P>
      </FixturaPaper>

      {/* <Group>
        <BUTTON_FUNC Label="Re-render" />
        <BUTTON_FUNC Label="Contact" />
      </Group> */}
    </FixturaComponent>
  );
};
