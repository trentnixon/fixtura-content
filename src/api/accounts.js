import { fetcher } from "@/utils/fetcher";
const qs = require("qs");
export async function getAccount(ID) {
  const queryParams = qs.stringify(
    {
      populate: ["subscription_tier", "account_type", "clubs", "associations","scheduler"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetcher(`accounts/${ID}?${queryParams}`);
  return res.data;
}
