// APIS
// Structure
import { FixturaSection } from "@/components/containers/Section";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
// Components
import AccountDetails from "@/components/PageAccount/server/AccountDetails";
import DisplayAccountItems from "@/components/PageAccount/server/DisplayAccountItems";
import DisplayAccountRenders from "@/components/PageAccount/server/DisplayAccountRenders";
import AccountTheming from "@/components/PageAccount/server/AccountTheme";
import AccountSubscription from "@/components/PageAccount/server/AccountSubscription";
import { MobileChecker } from "@/components/UI/isMobile";
import { UserFeedback } from "@/components/PageSelectedRender/client/ContactUsFeedBack";
import { BundleUpdates } from "@/components/PageSelectedRender/server/BundleWelcomeMessage";

export default async function Account({ params, searchParams }) {
  return (
    <>
      <FixturaSection
        shade={0}
        Title={"Render Library"}
        subTitle={"Review your content"}
        Icon={`ICO_HEADER_ACCOUNT`}
      >
        <FixturaGRIDOUTER>
          <FixturaGRIDCOL span={12}>
            <MobileChecker mobileOnly={true}>
              <AccountDetails params={params} />
            </MobileChecker>
            <DisplayAccountRenders params={params} />
            {/* <DisplayAccountItems params={params} />
            <AccountSubscription params={params} /> */}
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
          </FixturaGRIDCOL>
        </FixturaGRIDOUTER>
      </FixturaSection>
    </>
  );
}
