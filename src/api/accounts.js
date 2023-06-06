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
      populate: ["subscription_tier", "account_type", "clubs", "associations","scheduler"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetcher(`accounts/${ID}?${queryParams}`);
  return res.data;
}
