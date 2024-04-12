"use client";
const { HeaderMantine } = require("@/layouts/HeaderMantine");
const { AppShell, Container, Grid, Text, Group } = require("@mantine/core");
import withMobileWarning from "@/layouts/withMobileWarning";
import { AccountAssetTypeNavigation } from "@/layouts/Navigation/AccountAssetTypeNavigation";
import { IconCalendarEvent } from "@tabler/icons-react";
import { UserFeedback } from "@/components/PageSelectedRender/client/ContactUsFeedBack";
import { FixturaPaper } from "@/components/containers/paper";
// Context Providers
import {
  FixturaSettings,
  FixturaSettingsProvider,
} from "@/context/ContextFixturaSettings";
import {
  AccountSettings,
  AccountSettingsProvider,
} from "@/context/ContextAccountSettings";
import { useContext } from "react";

export const FixturaAppShell = ({ children }) => {
  const Content = withMobileWarning(() => (
    <FixturaSettingsProvider>
      <AccountSettingsProvider> 
        <AppShell
          padding={0}
          header={<HeaderMantine />}
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
        >
          <Container size={"xl"}>
            <Grid>
              <Grid.Col span={12} sm={4} md={3}>
                <AccountAssetTypeNavigation />
                <TrialStatus />
                <UserFeedback />
              </Grid.Col>
              <Grid.Col span={12} sm={8} md={9}>
                <main>{children}</main>
              </Grid.Col>
            </Grid>
          </Container>
        </AppShell>
      </AccountSettingsProvider>
    </FixturaSettingsProvider>
  ));

  return <Content />;
};

const TrialStatus = () => {
  const useAccountSettings = useContext(AccountSettings);
  const useFixturaSettings = useContext(FixturaSettings);
  /* console.log("useFixturaSettings ", useFixturaSettings) */
  const { trial_instance } = useAccountSettings;
  const { UI } = useFixturaSettings;

  const textAlign = UI.isMobile ? "center" : "left";
  const isActive = trial_instance.isActive;
  const trialDaysRemaining = trial_instance.trialDaysRemaining;

  if (!isActive) {
    return null;
  }

  const trialMessage = `Free trial expires in ${trialDaysRemaining} days`;

  return (
    <FixturaPaper my={10} c={3}>
      <Group noWrap={true} mx={0} position={"apart"}>
        <Text
          style={{ textAlign: textAlign, fontWeight: 600, lineHeight: "1.1" }}
        >
          {trialMessage}
        </Text>
        <IconCalendarEvent size={30} color="orange" style={{ marginLeft: 5 }} />
      </Group>
    </FixturaPaper>
  );
};
