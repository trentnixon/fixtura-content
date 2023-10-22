// APIS
// Structure
import { FixturaSection } from "@/components/containers/Section";

import { RenderCount } from "@/api/renders";
import { SelectedStatsStatment } from "@/components/PageSelectedRender/server/RenderStatsStatment";
import NavigationOptionsForAccountType from "@/components/PageOverview/NavigationOptionsForAccountType";
import {
  BundleUpdates,
  BundleWelcomeMessage,
} from "@/components/PageSelectedRender/server/BundleWelcomeMessage";
import { UserFeedback } from "@/components/PageSelectedRender/client/ContactUsFeedBack";

export default async function Render({ params }) {
  const Count = await RenderCount(params.render);
  return (
    <>
      <FixturaSection shade={0} Title={""} subTitle={""}>
        <BundleWelcomeMessage />
        <FixturaSection
          shade={0}
          Title={`Your Bundle`}
          subTitle={``}
          Icon={`ICO_HEADER_ARTICLE`}
        >
          <SelectedStatsStatment Count={Count} />
          <NavigationOptionsForAccountType params={params} />
        </FixturaSection>

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
