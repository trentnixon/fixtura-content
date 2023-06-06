import { fetcher } from "@/utils/fetcher";
const qs = require("qs");
export async function getSubscriptionTier(ID) {
  const queryParams = qs.stringify(
    {
      populate: ["subscription_packages","subscription_packages.assets"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetcher(`subscription-tiers/${ID}?${queryParams}`);
  return res.data;
}
