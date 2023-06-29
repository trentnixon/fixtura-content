import { getAccountFields } from "@/api/accounts";
import { SubscriptionTier } from "@/components/PageAccount/client/SubscriptionTier";
import { FixturaComponent } from "@/components/containers/containers";
import { FixturaPaper } from "@/components/containers/paper";
import { SectionHeaderWithSubHeader } from "@/layouts/Headings/SectionHeaderWithSubHeader";

export default async function AccountSubscription({ params }) {
  const account = await getAccountFields(params.id, [
    "subscription_tier",
    "subscription_tier.subscription_packages",
    "subscription_tier.subscription_packages.assets",
    "subscription_tier.subscription_packages.assets.asset_category",
  ]);
  return (
    <FixturaComponent>
      <SectionHeaderWithSubHeader Main="SUBSCRIPTION" Sub={`SUBSCRIPTION`} />

      <FixturaPaper>
        <SubscriptionTier
          subscription_tier={account.attributes.subscription_tier}
        />
      </FixturaPaper>
    </FixturaComponent>
  );
}
