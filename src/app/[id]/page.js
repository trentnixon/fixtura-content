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
          <FixturaGRIDCOL span={9}>
            <MobileChecker mobileOnly={true}>
              <AccountDetails params={params} />
            </MobileChecker>
            <DisplayAccountRenders params={params} />
            <AccountSubscription params={params} />
          </FixturaGRIDCOL>
          <FixturaGRIDCOL span={3}>
            <MobileChecker mobileOnly={false}>
              <AccountDetails params={params} />
            </MobileChecker>
            <AccountTheming params={params} />
            <DisplayAccountItems params={params} />
          </FixturaGRIDCOL>
        </FixturaGRIDOUTER>
      </FixturaSection>
    </>
  );
}
