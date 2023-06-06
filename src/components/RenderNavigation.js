/* import { getSubscriptionTier } from "@/api/SubscriptionTier";
import { getAccount } from "@/api/accounts";
import { getAssets } from "@/api/assets"; */
import { getRenders } from "@/api/renders";
import Link from "next/link";

export const RenderNavigation = async ({ params }) => {
  const { id, render } = params;
  //const account = await getAccount(id);
  const renders = await getRenders(render);
 /*  const Assets = await getAssets();
  const SubscriptionTier = await getSubscriptionTier(
    account.attributes.subscription_tier.data.id
  ); */
  //console.log(renders.attributes.downloads.data);

  return (
    <>
      <ListWriteUps
        params={params}
        groupedData={groupByGradeAndGame(renders.attributes.gtp_3_reports.data)}
      />
    </>
  );
};

export default function ListWriteUps({ groupedData, params }) {
  return (
    <div>
      {Object.keys(groupedData).map((gradeName,i) => {
        //console.log(gradeName);
        return (
          <div key={`grade_${i}`}>
            {gradeName == "Overview" ? (
              <>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  {gradeName}
                </h2>
                <ListOther
                  groupedData={groupedData}
                  DATA={Object.keys(groupedData[gradeName])}
                  params={params}
                  gradeName={gradeName}
                />
              </>
            ) : (
              <>
                <h2 className="text-1xl font-bold tracking-tight text-gray-700 my-2">
                  {gradeName}
                </h2>
                <ListGames
                  groupedData={groupedData}
                  DATA={Object.keys(groupedData[gradeName])}
                  params={params}
                  gradeName={gradeName}
                />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

const ListOther = ({ DATA, groupedData, params, gradeName }) => {
  const { id, render } = params;
  return (
    <>
      {DATA.map((gameID) => {
        return groupedData[gradeName][gameID].map((other, i) => {
          return (
            <div key={`otherID_${i}`}>
              <p>
                <Link href={`/${id}/${render}/o/${other.id}`}>
                  {other.attributes.asset.data.attributes.Name}
                </Link>
              </p>
            </div>
          );
        });
      })}
    </>
  );
};

const ListGames = ({ DATA, groupedData, params, gradeName }) => {
  const { id, render } = params;
  const ExtractTeams = (DATA) => {
    return `${DATA?.teamHome} vs ${DATA?.teamAway}`;
  };
  return (
    <>
      {DATA.map((gameID,i) => {
        //console.log(gameID);
        return (
          <div key={`gameID_${i}`}>
            <p>
              <Link href={`/${id}/${render}/g/${gameID}`}>
                {ExtractTeams(
                  groupedData[gradeName][gameID][0].attributes?.game_meta_datum
                    ?.data?.attributes
                )}
              </Link>
            </p>
          </div>
        );
      })}
    </>
  );
};

function groupByGradeAndGame(objArr) {
  return objArr.reduce((acc, obj) => {
    const grade =
      obj.attributes?.grade?.data?.attributes?.gradeName || "Overview";
    const gameID =
      obj.attributes?.game_meta_datum?.data?.attributes?.gameID || "Unknown";

    if (!acc[grade]) {
      acc[grade] = {};
    }

    if (!acc[grade][gameID]) {
      acc[grade][gameID] = [];
    }

    acc[grade][gameID].push(obj);

    return acc;
  }, {});
}
