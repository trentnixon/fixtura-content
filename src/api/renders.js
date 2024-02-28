import { fetcher } from "@/utils/fetcher";
const qs = require("qs");

export async function getAllRenders() {
  //const res = await fetcher(`renders`);
  const res = await fetcher({
    PATH: `renders`,
    nextConfig: { next: { revalidate: 600 }},
  }); 
  return res.data;
}

//["scheduler", "scheduler.renders"]
export async function getRenderFields(ID, FIELDS) {
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
    PATH: `renders/${ID}?${queryParams}`,
    nextConfig: { next: { revalidate: 600 } },
  });
  //console.log(res.data)
  return res.data;
}

export async function getRenderFieldsWithFilters(ID, FIELDS, FILTERS) {
  const queryParams = qs.stringify(
    {
      filters: {
        ...FILTERS
      },
      populate: FIELDS,
    },

    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetcher({
    PATH: `renders/${ID}?${queryParams}`,
    nextConfig: {next: { revalidate: 600 } },
  });
  //console.log(res.data);
  return res.data;
}

export async function getRenders(ID) {
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
      ],
    },
    {
      encodeValuesOnly: true,
    }
  );

  //const res = await fetcher(`renders/${ID}?${queryParams}`);
  const res = await fetcher({
    PATH: `renders/${ID}?${queryParams}`,
    nextConfig: { next: { revalidate: 60 } },
  });
  //console.log("res.data", res.data);
  return res.data;
}

export async function RenderCount(ID) {
  //const res = await fetcher(`renders`);
  const res = await fetcher({
    PATH: `render/AssetCount`,
    method: "POST",
    nextConfig: { next: { revalidate: 600 } },
    body: { ID: ID },
  }); 
  return res.data;
}
