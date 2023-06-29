// APIS
import { getFullAccount } from "@/api/accounts";
import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";

import { TrackingCompetitions } from "@/components/PageAccount/client/TrackingCompetitions";
import { TrackingTeams } from "@/components/PageAccount/client/TrackingTeams";
import { FixturaStack } from "@/components/containers/stack";
import { FixturaBox } from "@/components/containers/boxes";

export default async function DisplayAccountItems({ params }) {
  const { id } = params;
  const accountBasic = await getFullAccount(id);
  const TYPE = accountBasic.attributes.account_type.data.attributes.Name;

  return (
    <>
      <H size="h5" align="left">
        Tracked Items
      </H>
      <FixturaStack>
        <P c="dark">
          A comprehensive list of clubs or competitions associated with your
          profile.
        </P>
       
          {TYPE === "Association" ? (
            <TrackingCompetitions
              associations={accountBasic.attributes.associations}
            />
          ) : (
            <TrackingTeams clubs={accountBasic.attributes.clubs} />
          )}
      
      </FixturaStack>
    </>
  );
}
