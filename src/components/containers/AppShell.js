"use client";
const { HeaderMantine } = require("@/layouts/HeaderMantine");
const { AppShell, Container, Grid, Text, Group } = require("@mantine/core");
import withMobileWarning from "@/layouts/withMobileWarning";
import { useParams } from "next/navigation";
import { AccountAssetTypeNavigation } from "@/layouts/Navigation/AccountAssetTypeNavigation";
import { IconCalendarEvent } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { UserFeedback } from "@/components/PageSelectedRender/client/ContactUsFeedBack";
import { FixturaPaper } from "@/components/containers/paper";
// Context Providers
import { FixturaSettingsProvider } from "@/context/ContextFixturaSettings";
import { AccountSettingsProvider } from "@/context/ContextAccountSettings";

export const FixturaAppShell = (props) => {
  const { OBJ } = props;
  const { params, isActive } = OBJ;
  const URLParams = useParams();
  OBJ.URLParams = URLParams;
  const Content = withMobileWarning(() => (
    <FixturaSettingsProvider>
      <AccountSettingsProvider {...props}>
        <AppShell 
          padding={0}
          header={
            <HeaderMantine
              params={params}
              URLParams={URLParams}
              isActive={isActive}
              {...props}
            />
          }
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
                <AccountAssetTypeNavigation {...props} />
                <TrialStatus {...props} />
                <UserFeedback />
              </Grid.Col>
              <Grid.Col span={12} sm={8} md={9}>
                <main>{props.children}</main>
              </Grid.Col>
            </Grid>
          </Container>
        </AppShell>
      </AccountSettingsProvider>
    </FixturaSettingsProvider>
  ));

  return <Content />;
};

const TrialStatus = (props) => {
  const { OBJ } = props;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const textAlign = isMobile ? "center" : "left";
  const isActive = OBJ.isActive;
  const trialDaysRemaining = OBJ.trialDaysRemaining;

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
