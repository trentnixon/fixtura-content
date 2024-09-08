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

  //const res = await fetcher(`subscription-tiers/${ID}?${queryParams}`);
  const res = await fetcher({
    PATH: `subscription-tiers/${ID}?${queryParams}`,
    nextConfig: { next: { revalidate: 0 } },
  });
  return res.data;
}
