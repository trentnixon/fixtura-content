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
  Grid,
  Space,
} from "@mantine/core";

import { FindAccountLabel, FindAccountLogo } from "@/utils/actions";
import { FixturaPageHeader } from "@/layouts/Headings/PageHeader";
import { H } from "@/components/Type/Headers";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaPaper } from "@/components/containers/paper";
import { N, P, S } from "@/components/Type/Paragraph";
import { Icon123, IconUsersGroup } from "@tabler/icons-react";
import { FixturaSection } from "@/components/containers/Section";
import { FixturaContainer } from "@/components/containers/containers";
import { HowToUseGuide } from "@/components/sections/HowToUseGuide";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import AccountDetails from "@/components/PageAccount/server/AccountDetails";
import DisplayAccountItems from "@/components/PageAccount/server/DisplayAccountItems";
import DisplayAccountRenders from "@/components/PageAccount/server/DisplayAccountRenders";
import AccountTheming from "@/components/PageAccount/server/AccountTheme";
import { BUTTON_LINK } from "@/components/UI/buttons";

export const SubscriptionTier = ({ subscription_tier }) => {
  const sub = subscription_tier.data?.attributes;

  /*  function groupBySubscriptionAndAssetCategory(subscriptions) {
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
    } */

  if (sub === undefined) return <>No Subscription Found</>;

  return (
    <Stack>
      <H size="h4" align="left" color="gray.6">
        Level: {sub.Name}
      </H>
      <P>{sub.description}</P>

      <BUTTON_LINK
        Label="Subscription Packages"
        href={"https://www.fixtura.com.au/pricing/"}
      />
   
    </Stack>
  );
};

{
  /* <Stack>
          {Object.entries(
            groupBySubscriptionAndAssetCategory(sub.subscription_packages.data)
          ).map(([subscriptionName, assetCategories], i) => {
            return (
              <FixturaPaper key={i}>
                <H size="h4" my={5}>
                  {subscriptionName}
                </H>
                <Group grow align="flex-start">
                  {Object.entries(assetCategories).map(
                    ([categoryName, assetNames], j) => {
                      return (
                        <div key={j} my={3}>
                          <>
                            <H size="h5">
                              <Icon123 />
                              {categoryName}
                            </H>
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
                          </>
                        </div>
                      );
                    }
                  )}
                </Group>
              </FixturaPaper>
            );
          })}
        </Stack> */
}
