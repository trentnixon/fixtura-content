"use client";
const { HeaderMantine } = require("@/layouts/HeaderMantine");
const { AppShell, Container, Grid, Text, Group } = require("@mantine/core");
import withMobileWarning from "@/layouts/withMobileWarning";
import { useParams } from "next/navigation";
import { UserDetailsCard } from "@/layouts/UserDetailsCard";
import { P } from "@/components/Type/Paragraph";
import { IconCalendarEvent } from "@tabler/icons-react";

export const FixturaAppShell = (props) => {
  const { accountBasic } = props;
  const URLParams = useParams();

  const calculateRemainingDays = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    return Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  };

  const trialDaysRemaining = calculateRemainingDays(
    accountBasic?.attributes?.trial_instance?.data?.attributes.endDate
  );

  const trialMessage = accountBasic?.attributes?.trial_instance?.data
    ?.attributes.isActive
    ? `Free trial expires in ${trialDaysRemaining} days`
    : false;

  const Content = withMobileWarning(() => (
    <AppShell
      padding={0}
      header={
        <HeaderMantine
          params={props.params}
          URLParams={URLParams}
          isActive={
            accountBasic.attributes?.trial_instance?.data?.attributes?.isActive
          }
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
            <UserDetailsCard accountBasic={accountBasic} />
            <TrialStatus accountBasic={accountBasic} />
          </Grid.Col>
          <Grid.Col span={12} sm={8} md={9}>
            <main>{props.children}</main>
          </Grid.Col>
        </Grid>
      </Container>
    </AppShell>
  ));

  return <Content />;
};

const TrialStatus = ({ accountBasic }) => {
  const isActive =
    accountBasic.attributes?.trial_instance?.data?.attributes?.isActive;

  const calculateRemainingDays = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    return Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  };

  if (!isActive) {
    return null;
  }

  const trialDaysRemaining = calculateRemainingDays(
    accountBasic.attributes.trial_instance.data.attributes.endDate
  );

  const trialMessage = `Free trial expires in ${trialDaysRemaining} days`;

  return (
    <Group noWrap={true} mx={10} my={15}>
      <Text style={{ textAlign: "right", fontWeight: 600, lineHeight: "1.1" }}>
        {trialMessage}
      </Text>
      <IconCalendarEvent size={30} color="orange" style={{ marginLeft: 5 }} />
    </Group>
  );
};
