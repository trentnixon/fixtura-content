import { fetcher } from "@/utils/fetcher";
const qs = require("qs");

//["scheduler", "scheduler.renders"]
export async function getWriteupsFields(ID, FIELDS) {
  const queryParams = qs.stringify(
    {
      populate: FIELDS,
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetcher({
    PATH: `gtp-3-reports/${ID}?${queryParams}`,
    nextConfig: { next: { revalidate: 600 } },
  });

  return res.data;
}

export async function getWriteupsFieldsWithFilters(FIELDS, FILTERS) {
  const queryParams = qs.stringify(
    {
      pagination: {
        limit: 1000,
      },
      filters: {
        ...FILTERS,
      },
      populate: FIELDS,
    },

    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetcher({
    PATH: `gtp-3-reports?${queryParams}`,
    nextConfig: { next: { revalidate: 600 } },
  });
  //console.log(res.data);
  return res.data;
}

export async function getWriteupsFromRender(ID, PATH, TYPE, BiasID) {
  console.log(" getWriteupsFromRender ",ID, PATH, TYPE, BiasID);
  const res = await fetcher({
    PATH: `render/getRenderWriteups/`,
    method: `POST`,
    body: { ID: ID, PATH: PATH, TYPE: TYPE, BiasID: BiasID },
    nextConfig: { cache: "no-store" },
  });
  return res.data;
}
