import { fetcher } from "@/utils/fetcher";
const qs = require("qs");
export const revalidate = 600;
export async function getAllAccount() {
  const queryParams = qs.stringify(
    {
      populate: ["scheduler", "scheduler.renders"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await fetcher(`accounts?${queryParams}`);
  //console.log(res.data)
  return res.data;
}

export async function getAccount(ID) {
  const queryParams = qs.stringify(
    {
      populate: [
        "subscription_tier",
        "account_type",
        "clubs",
        "clubs.Logo",
        "associations",
        "associations.Logo",
        "scheduler",
      ],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetcher(`accounts/${ID}?${queryParams}`);
  return res.data;
}

export async function getFullAccount(ID) {
  const queryParams = qs.stringify(
    {
      populate: [
        "subscription_tier",
        "subscription_tier.subscription_packages",
        "subscription_tier.subscription_packages.assets",
        "subscription_tier.subscription_packages.assets.asset_category",
        "account_type",
        "clubs",
        "clubs.Logo",
        "clubs.teams",
        "associations",
        "associations.competitions",
        "associations.Logo",
        "scheduler",
        "template",
        "theme",
        "audio_option",
        "order",
        'sponsors'

      ],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetcher(`accounts/${ID}?${queryParams}`);
  return res.data;
}
