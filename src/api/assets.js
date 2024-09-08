import { fetcher } from "@/utils/fetcher";
const qs = require("qs");
export async function getAssets() {
  const queryParams = qs.stringify(
    {
      populate: ["asset_category", "subscription_package"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  //const res = await fetcher(`assets?${queryParams}`);
  const res = await fetcher({
    PATH: `assets?${queryParams}`,
    nextConfig: { next: { revalidate: 0 } },
  });
  return res.data;
}
