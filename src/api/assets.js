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

  const res = await fetcher(`assets?${queryParams}`);
  return res.data;
}
