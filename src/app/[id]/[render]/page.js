// APIS
// Structure
import { FixturaSection } from "@/components/containers/Section";

import { RenderCount, getRenders } from "@/api/renders";
import { SelectedStatsStatment } from "@/components/PageSelectedRender/server/RenderStatsStatment";
import NavigationOptionsForAccountType from "@/components/PageOverview/NavigationOptionsForAccountType";
import {
  BundleUpdates,
  BundleWelcomeMessage,
} from "@/components/PageSelectedRender/server/BundleWelcomeMessage";
import { UserFeedback } from "@/components/PageSelectedRender/client/ContactUsFeedBack";
import { RequestTeamRosterForRender } from "@/components/Images/client/createTeamRoster";

export default async function Render({ params }) {
  const Count = await RenderCount(params.render);
  const CompleteRender = await getRenders(params.render);
  return (
    <>
      <FixturaSection shade={0} Title={""} subTitle={""}>
        <FixturaSection
          shade={0}
          Title={`Your Bundle`}
          subTitle={``}
          Icon={`ICO_HEADER_ARTICLE`}
        >
          <SelectedStatsStatment Count={Count} />
          <NavigationOptionsForAccountType params={params} />
        </FixturaSection>
    
        <RequestTeamRosterForRender Render={params.render} CompleteRender={CompleteRender}/>
        <FixturaSection
          shade={0}
          Title={`Fixtura Updates`}
          subTitle={``}
          Icon={`ICO_Edit`}
        >
          <BundleUpdates />
        </FixturaSection>
        <FixturaSection
          shade={0}
          Title={`Feedback`}
          subTitle={``}
          Icon={`ICO_Speakerphone`}
        >
          <UserFeedback />
        </FixturaSection>
      </FixturaSection>
    </>
  );
}
