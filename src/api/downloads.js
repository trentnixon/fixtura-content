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



  export async function getdownloadFieldsWithFilters(FIELDS, FILTERS) {
    console.log(FIELDS, FILTERS)
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
      PATH: `downloads?${queryParams}`,
      nextConfig: {next: { revalidate: 600 } },
    });
    //console.log(res.data);
    return res.data;
  }


  export async function userForceAssetRerender(ID) {
    console.log(ID)
    //api/download/ForceAssetRerender
    const res = await fetcher({
      PATH: `download/ForceAssetRerender`,  
      method:`POST`,
      body:{data:{RerenderID:ID}},
      nextConfig: { cache: 'no-store' },
    });
    return res.data; 
  }