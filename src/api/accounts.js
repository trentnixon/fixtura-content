import { fetcher } from "@/utils/fetcher";
const qs = require("qs");


/* 
  All this ACCOUNT 
  Here are a buch of Account API routes for different circumstances
*/

export async function getAllAccount() {
  const queryParams = qs.stringify(
    {
      populate: ["scheduler", "scheduler.renders"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  //const res = await fetcher(`accounts?${queryParams}`);
  const res = await fetcher({
    PATH: `accounts?${queryParams}`,
    nextConfig: {next: { revalidate: 600 }},
  });

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

  //const res = await fetcher(`accounts/${ID}?${queryParams}`);
  const res = await fetcher({
    PATH: `accounts/${ID}?${queryParams}`,
    nextConfig: { next: { revalidate: 600 }},
  });
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
        "clubs.teams.grades",
        "clubs.teams.competition",
        "associations",
        "associations.competitions",
        "associations.Logo",
        "scheduler",
        "template",
        "theme",
        "audio_option",
        "order",
        "sponsors",
      ],
    },
    {
      encodeValuesOnly: true,
    }
  );

  //const res = await fetcher(`accounts/${ID}?${queryParams}`);
  const res = await fetcher({
    PATH: `accounts/${ID}?${queryParams}`,
    nextConfig: { next: { revalidate: 600 } },
  });
  return res.data;
}

//["scheduler", "scheduler.renders"]
export async function getAccountFields(ID, FIELDS) {
  const queryParams = qs.stringify(
    {
      populate: FIELDS,
    },
    {
      encodeValuesOnly: true,
    }
  );
  //const res = await fetcher(`accounts/${ID}?${queryParams}`);
  const res = await fetcher({
    PATH: `accounts/${ID}?${queryParams}`,
    nextConfig: { next: { revalidate: 600 } },
  });
  //console.log(res.data)
  return res.data;
}
