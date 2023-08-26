import { fetcher } from "@/utils/fetcher";
const qs = require("qs");

export async function getGames() {
  //const res = await fetcher(`game-meta-datas`);
  const res = await fetcher({
    PATH: `game-meta-datas`,
    nextConfig: { next: { revalidate: 600 } },
  });
  return res.data;
}

export async function getGame(gameID) {
  const queryParams = qs.stringify(
    {
      filters: {
        gameID: {
          $eq: gameID,
        },
      },
      populate: ["gtp_3_reports", "gtp_3_reports.asset"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  //const res = await fetcher(`game-meta-datas?${queryParams}`);
  const res = await fetcher({
    PATH: `game-meta-datas?${queryParams}`,
    nextConfig: { next: { revalidate: 600 } },
  });
  //console.log(res)
  return res.data;
}

export async function getGameByID(gameID) {
  const queryParams = qs.stringify(
    {
      populate: ["gtp_3_reports", "gtp_3_reports.asset"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  //const res = await fetcher(`game-meta-datas/${gameID}?${queryParams}`);
  const res = await fetcher({
    PATH: `game-meta-datas/${gameID}?${queryParams}`,
    nextConfig: { next: { revalidate: 600 } },
  });
  //console.log(res)
  return res.data;
}



// PUT
export async function putGameContext(ID,CONTEXT) {
  //console.log(ID,CONTEXT)
  const res = await fetcher({
    PATH: `game-meta-datas/${ID}`, 
    method:`PUT`,
    body:{data:{gameContext:CONTEXT}},
    nextConfig: { cache: 'no-store' },
  });
  return res.data; 
}