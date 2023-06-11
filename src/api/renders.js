import { fetcher } from "@/utils/fetcher";
const qs = require("qs");

export async function getAllRenders() {
  const res = await fetcher(`renders`);
  //console.log(res.data)
  return res.data;
}

export async function getRenders(ID) {
  /*
  ,
      fields: [
        "Name",
        "downloads",
        "gtp_3_reports",
        "createdAt",
        "gtp_3_reports.game_meta_datum.date",
      ],
  */
  const queryParams = qs.stringify(
    {
      populate: [
        "downloads",
        "downloads.asset",
        "downloads.asset.asset_type",
        "gtp_3_reports",
        "gtp_3_reports.game_meta_datum",
        "gtp_3_reports.game_meta_datum.grade",
        "gtp_3_reports.asset",
        "gtp_3_reports.asset.asset_type",
        "gtp_3_reports.grade",
        "gtp_3_reports.teams",
      ]
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetcher(`renders/${ID}?${queryParams}`);
  //console.log("res.data", res.data);
  return res.data;
}
