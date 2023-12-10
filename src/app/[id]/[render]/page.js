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
import { FindAccountType } from "@/utils/actions";
import { getAccount } from "@/api/accounts";
import { P } from "@/components/Type/Paragraph";
import { FixturaPaper } from "@/components/containers/paper";

export default async function Render({ params }) {
  const Count = await RenderCount(params.render);
  const CompleteRender = await getRenders(params.render);
  const account = await getAccount(params.id);
  const AccountType = FindAccountType(account);

  return (
    <>
      <FixturaSection shade={0} Title={""} subTitle={""}>
        <TemplatePromo />
        <SelectedStatsStatment Count={Count} />
        <FixturaSection
          shade={0}
          Title={`Your Bundle`}
          subTitle={``}
          Icon={`ICO_HEADER_ARTICLE`}
        >
          <NavigationOptionsForAccountType params={params} />
        </FixturaSection>
        {AccountType === "Club" ? (
          <RequestTeamRosterForRender
            Render={params.render}
            CompleteRender={CompleteRender}
          />
        ) : (
          false
        )}
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

const TemplatePromo = () => {
  return (
    <FixturaSection
      shade={0}
      Title={`New Template Available`}
      subTitle={``}
      Icon={null}
    >
      <img src="https://fixtura.s3.ap-southeast-2.amazonaws.com/CNSW_Poster_dca81f5732.png" />

      <FixturaPaper>
        <P>
          Drawing inspiration from the CNSW digital account, the CNSW template
          introduces stylish animations and a selection of trendy background
          options.
        </P>
        <P>
          Explore how the CNSW template can enhance your experience by checking
          out the updated Customizer in your member&apos;s area.
        </P>
      </FixturaPaper>
    </FixturaSection>
  );
};
