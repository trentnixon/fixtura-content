/* import { getSubscriptionTier } from "@/api/SubscriptionTier";
import { getAccount } from "@/api/accounts";
import { getAssets } from "@/api/assets"; */
import { getRenders } from "@/api/renders";
import Link from "next/link";

export const RenderNavigation = async ({ params }) => {
  const { id, render } = params;
  const renders = await getRenders(render);

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
    <div className="">
      <div className="join join-vertical w-full">
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" checked="checked" />
          <div className="collapse-title text-xl font-medium">Overview</div>
          <div className="collapse-content">
            {Object.keys(groupedData).map((gradeName, i) => {
              //console.log(gradeName);
              return (
                <div key={`grade_${i}`}>
                  {gradeName == "Overview" ? (
                    <ListOther
                      groupedData={groupedData}
                      DATA={Object.keys(groupedData[gradeName])}
                      params={params}
                      gradeName={gradeName}
                    />
                  ) : (
                    false
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium">Games</div>
          <div className="collapse-content">
            {Object.keys(groupedData).map((gradeName, i) => {
              //console.log(gradeName);
              return (
                <div key={`grade_${i}`}>
                  <ul className="menu  w-auto rounded-box p-0">
                    <li>
                      <h2 className="text-1xl font-bold tracking-tight text-gray-700 my-1 px-0">
                        {gradeName}
                      </h2>
                      <ListGames
                        groupedData={groupedData}
                        DATA={Object.keys(groupedData[gradeName])}
                        params={params}
                        gradeName={gradeName}
                      />
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const ListOther = ({ DATA, groupedData, params, gradeName }) => {
  const { id, render } = params;
  return (
    <ListContainer>
      {DATA.map((gameID) => {
        return groupedData[gradeName][gameID].map((other, i) => {
          return (
            <ListItem
              key={`otherID_${i}`}
              id={id}
              render={render}
              LINKID={other.id}
              Label={other.attributes.asset.data.attributes.Name}
              page={"o"}
            />
          );
        });
      })}
    </ListContainer>
  );
};

const ListGames = ({ DATA, groupedData, params, gradeName }) => {
  const { id, render } = params;
  const ExtractTeams = (DATA) => {
    const limit = 20;
    const teamHome = DATA?.teamHome;
    const teamAway = DATA?.teamAway;

    const teamHomeShort =
      teamHome && teamHome.length > limit
        ? teamHome.substring(0, limit) + "..."
        : teamHome;
    const teamAwayShort =
      teamAway && teamAway.length > limit
        ? teamAway.substring(0, limit) + "..."
        : teamAway;

    return `${teamHomeShort} vs ${teamAwayShort}`;
  };

  return (
    <ListContainer>
      {DATA.map((gameID, i) => {
        //console.log(gameID);
        return (
          <ListItem
            key={`gameID_${i}`}
            id={id}
            render={render}
            LINKID={gameID}
            page={"g"}
            Label={ExtractTeams(
              groupedData[gradeName][gameID][0].attributes?.game_meta_datum
                ?.data?.attributes
            )}
          />
        );
      })}
    </ListContainer>
  );
};

const ListContainer = ({ children }) => {
  return <ul className="menu  w-auto rounded-box p-0 m-0">{children}</ul>;
};
const ListItem = ({ id, render, LINKID, Label, page }) => {
  return (
    <li className="p-0 overflow-hidden">
      <Link href={`/${id}/${render}/${page}/${LINKID}`} className="my-1">
        <p className="text-xs">{Label}</p>
      </Link>
    </li>
  );
};

// func, move this
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
