import { fetcher } from "@/utils/fetcher";

const qs = require("qs");

export async function withTokenValidation(token) {
  //console.log("check token", token);
  const queryParams = qs.stringify(
    {
      filters: {
        token: {
          $eq: token,
        },
      },
      populate: ["account"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  //const res = await fetcher(`assets?${queryParams}`);
  const res = await fetcher({
    PATH: `render-tokens?${queryParams}`,
    nextConfig: { next: { revalidate: 0 } },
  });
  //console.log("Token Response, ", res.data.length);

  return res.data.length === 1 ? true : false;
}
