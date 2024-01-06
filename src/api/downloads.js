import { fetcher } from "@/utils/fetcher";
const qs = require("qs");


export async function userFeedbackOnDownload(ID,CONTEXT) {
    ///api/downloads/:id
    //console.log(ID,CONTEXT)
    const res = await fetcher({
      PATH: `downloads/${ID}`, 
      method:`PUT`,
      body:{data:{isAccurate:CONTEXT}},
      nextConfig: { cache: 'no-store' },
    });
    return res.data; 
  }