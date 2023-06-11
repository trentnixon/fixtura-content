"use client";

import {
  Container,
  SimpleGrid,
  Image,
  Group,
  List,
  Stack,
  ScrollArea,
  ThemeIcon,
} from "@mantine/core";

import { FindAccountLabel, FindAccountLogo } from "@/utils/actions";
import { FixturaPageHeader } from "@/layouts/Headings/PageHeader";
import { H } from "@/components/Type/Headers";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaPaper } from "@/components/containers/paper";
import { N, P, S } from "@/components/Type/Paragraph";
import { RenderTable } from "@/components/Tables/ViewAccountsRenders";
import { IconUsersGroup } from "@tabler/icons-react";
import { FixturaSection } from "@/components/containers/Section";

export const AccountHomeGridLayout = ({
  account,
  scheduler,
  params,
  subscription_tier,
  clubs,
  associations,
  account_type,
  template,
  theme,
  audio_option,
}) => {
  console.log("account_type ", account_type.data.attributes.Name);

  return (
    <>
      <FixturaPageHeader
        Logo={FindAccountLogo(account)}
        heading={FindAccountLabel(account)}
        subheading={`Home`}
      />

      <Container my="md" size={`xl`}>
        <Group position="center" mb={50}>
          {FindAccountLogo(account) === null ? (
            false
          ) : (
            <Image
              src={FindAccountLogo(account)}
              width={60}
              alt={FindAccountLabel(account)}
              height={60}
              sx={(theme) => ({
                backgroundColor: theme.colors.gray[2],

                borderRadius: "100%",
              })}
              fit="contain"
            />
          )}

          <Stack spacing={0}>
            <H size="h1">{FindAccountLabel(account)}</H>
            <H size="h5" weight={400}>
              {account_type.data.attributes.Name}
            </H>
          </Stack>
        </Group>

        {/*  SECTION  */}
        <FixturaSection shade={5} Title={"HOW TO USE"}>
          <SimpleGrid
            cols={1}
            mb={20}
            spacing="md"
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          >
            How to use: Icons, what do they mean (render, upcoming etc) Day of
            scheduled render : Monday, when next render is due: 2 days, Number
            of render completed: 1,
          </SimpleGrid>
        </FixturaSection>

        <FixturaSection shade={0} Title={"RENDERS"}>
          <SimpleGrid
            cols={2}
            mb={20}
            spacing="md"
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          >
            <RenderTable
              RENDERS={scheduler?.attributes?.renders?.data}
              params={params}
            />
            <Stack>
              <H size="h6" align="right">
                Tracking {account_type.data.attributes.Name} items
              </H>
              {account_type.data.attributes.Name === "Association" ? (
                <TrackingCompetitions associations={associations} />
              ) : (
                <TrackingTeams clubs={clubs} />
              )}
            </Stack>
          </SimpleGrid>
        </FixturaSection>

        <FixturaSection shade={0} Title={"THEMING"}>
          <Themeing
            template={template}
            theme={theme}
            audio_option={audio_option}
          />
        </FixturaSection>

        <FixturaSection shade={0} Title={"YOUR SUBSCRIPTION"}>
          <SubscriptionTier subscription_tier={subscription_tier} />
        </FixturaSection>
      </Container>
    </>
  );
};

const TrackingCompetitions = ({ associations }) => {
  return (
    <FixturaPaper>
      <ScrollArea h={250}>
        <List
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="blue" size={14} radius="sm">
              <IconUsersGroup size="1rem" />
            </ThemeIcon>
          }
        >
          {associations.data.map((Association, i) => {
            return (
              <div key={i}>
                {Association.attributes.competitions.data.map((comp, i) => {
                  return (
                    <List.Item key={i} my={20}>
                      <P>{comp.attributes.competitionName}</P>
                    </List.Item>
                  );
                })}
              </div>
            );
          })}
        </List>
      </ScrollArea>
    </FixturaPaper>
  );
};

const TrackingTeams = ({ clubs }) => {
  return (
    <FixturaPaper>
      <ScrollArea h={250}>
        <List
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="blue" size={14} radius="sm">
              <IconUsersGroup size="1rem" />
            </ThemeIcon>
          }
        >
          {clubs.data.map((Club, i) => {
            return (
              <>
                {Club.attributes.teams.data.map((teams, i) => {
                  return (
                    <List.Item key={i} my={20}>
                      <P>{teams.attributes.teamName}</P>
                    </List.Item>
                  );
                })}
              </>
            );
          })}
        </List>
      </ScrollArea>
    </FixturaPaper>
  );
};

const Themeing = ({ template, theme, audio_option }) => {
  console.log("template ", template);

  return (
    <>
      <Group position="apart" grow>
        <Stack>
          <H size="h6">Template</H>
          {template.data === null ? (
            "no template"
          ) : (
            <FixturaBox>{template.data.attributes.Name}</FixturaBox>
          )}
        </Stack>
        <Stack>
          <H size="h6">Theme</H>
          {theme.data === null ? (
            "no theme"
          ) : (
            <FixturaBox>{theme.data.attributes.Name}</FixturaBox>
          )}
        </Stack>
        <Stack>
          <H size="h6">Audio</H>
          {audio_option.data === null ? (
            "no audio_option"
          ) : (
            <FixturaBox>{audio_option.data.attributes.Name}</FixturaBox>
          )}
        </Stack>
      </Group>
    </>
  );
};

const SubscriptionTier = ({ subscription_tier }) => {
  const sub = subscription_tier.data?.attributes;

  console.log(sub);
  function groupBySubscriptionAndAssetCategory(subscriptions) {
    console.log("subscriptionssubscriptionssubscriptions", subscriptions);
    return subscriptions.reduce((groupedSubscriptions, subscription) => {
      const subscriptionName = subscription.attributes.Name;

      if (!groupedSubscriptions[subscriptionName]) {
        groupedSubscriptions[subscriptionName] = {};
      }

      subscription.attributes.assets.data.forEach((asset) => {
        const assetName = asset.attributes.Name;
        const categoryName =
          asset.attributes.asset_category.data.attributes.Name;

        if (!groupedSubscriptions[subscriptionName][categoryName]) {
          groupedSubscriptions[subscriptionName][categoryName] = {};
        }

        if (!groupedSubscriptions[subscriptionName][categoryName][assetName]) {
          groupedSubscriptions[subscriptionName][categoryName][assetName] = [];
        }

        groupedSubscriptions[subscriptionName][categoryName][assetName].push(
          asset
        );
      });

      return groupedSubscriptions;
    }, {});
  }

  if (sub === undefined) return <>No Subscription Found</>;

  return (
    <Stack>
      <H size="h4" align="right">
        Level: {sub.Name}
      </H>
      <N>In Strapi Add: Icon for each option, beter description.</N>

      <Group position="apart" grow align="flex-start">
        {Object.entries(
          groupBySubscriptionAndAssetCategory(sub.subscription_packages.data)
        ).map(([subscriptionName, assetCategories], i) => {
          return (
            <div key={i}>
              <H size="h4" my={5}>
                {subscriptionName}
              </H>
              <FixturaPaper>
                {Object.entries(assetCategories).map(
                  ([categoryName, assetNames], j) => {
                    return (
                      <div key={j} my={3}>
                        <H size="h5">{categoryName}</H>
                        <List withPadding>
                          {Object.entries(assetNames).map(
                            ([assetName, assets], k) => {
                              return (
                                <List.Item key={k}>
                                  <P>{assetName}</P>
                                </List.Item>
                              );
                            }
                          )}
                        </List>
                      </div>
                    );
                  }
                )}
              </FixturaPaper>
            </div>
          );
        })}
      </Group>

      <P>package type: Club Captain: items expected upgrade package,</P>
    </Stack>
  );
};
