import { fetcher } from "@/utils/fetcher";
const qs = require("qs");
export async function getScheduler(ID) {
  const queryParams = qs.stringify(
    {
      populate: ["renders","days_of_the_week"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetcher(`schedulers/${ID}?${queryParams}`);
  return res.data;
}
