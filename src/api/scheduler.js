import { getAccountFields } from "@/api/accounts";
import { fetcher } from "@/utils/fetcher";
const qs = require("qs");

export async function getScheduler(ID) {
  const queryParams = qs.stringify(
    {
      populate: ["renders", "days_of_the_week","game_results_in_renders","upcoming_games_in_renders"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetcher({
    PATH: `schedulers/${ID}?${queryParams}`,
    nextConfig: { next: { revalidate: 600 }}
  });
  return res.data;
}

export async function getSchedulerFromAccount(ID) {  
  //getAccountFields
  const ACC = await getAccountFields(ID, ["scheduler", "scheduler.renders"]); 
  //console.log("getSchedulerFromAccount ", ACC.attributes.scheduler.data.id);
  return await getScheduler(ACC.attributes.scheduler.data.id);
}
