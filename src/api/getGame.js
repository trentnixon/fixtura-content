import { fetcher } from "@/utils/fetcher";
const qs = require("qs");
export async function getGame(gameID) {
  const queryParams = qs.stringify(
    {
        filters: {
            gameID: {
              $eq: gameID,
            },
          },
      populate: ["gtp_3_reports","gtp_3_reports.asset"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetcher(`game-meta-datas?${queryParams}`);
  return res.data;
}
