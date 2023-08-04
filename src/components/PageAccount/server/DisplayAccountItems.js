// APIS
import { getFullAccount } from "@/api/accounts";
import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";

import { TrackingCompetitions } from "@/components/PageAccount/client/TrackingCompetitions";
import { TrackingTeams } from "@/components/PageAccount/client/TrackingTeams";
import { FixturaStack } from "@/components/containers/stack";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaPaper } from "@/components/containers/paper";
import { FixturaComponent } from "@/components/containers/containers";
import { SectionHeaderWithSubHeader } from "@/layouts/Headings/SectionHeaderWithSubHeader";

export default async function DisplayAccountItems({ params }) {
  const { id } = params;
  const accountBasic = await getFullAccount(id);
  const TYPE = accountBasic.attributes.account_type.data.attributes.Name;

  return (
    <FixturaComponent>
      <SectionHeaderWithSubHeader
        Main="Tracked Items"
        Sub={`What we are tracking`}
      />
      
      <FixturaPaper>
        <FixturaStack>
          {TYPE === "Association" ? (
            <TrackingCompetitions
              associations={accountBasic.attributes.associations}
            />
          ) : (
            <TrackingTeams clubs={accountBasic.attributes.clubs} />
          )}
        </FixturaStack>
      </FixturaPaper>
      <P  my={10} c="dark" fz={'sm'}>
        A comprehensive list of clubs or competitions associated with your
        profile. For a full breakdown consult your Admin panel.
      </P>
    </FixturaComponent>
  );
}
