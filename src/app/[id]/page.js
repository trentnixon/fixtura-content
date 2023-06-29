// APIS
// Structure
import { FixturaPageHeader } from "@/layouts/Headings/PageHeader";
import { FixturaSection } from "@/components/containers/Section";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
// Components
import AccountDetails from "@/components/PageAccount/server/AccountDetails";
import DisplayAccountItems from "@/components/PageAccount/server/DisplayAccountItems";
import DisplayAccountRenders from "@/components/PageAccount/server/DisplayAccountRenders";
import AccountTheming from "@/components/PageAccount/server/AccountTheme";
import AccountSubscription from "@/components/PageAccount/server/AccountSubscription";
import { HeroText } from "@/layouts/Headings/server/Heros";

export default async function Account({ params }) {
  return (
    <>
      <FixturaSection
        shade={0}
        Title={"Your Account"}
        subTitle={"review your rendered assets"}
      > 
        <FixturaGRIDOUTER>
          <FixturaGRIDCOL span={4}>
            <AccountDetails params={params} />
            <DisplayAccountItems params={params} />
          </FixturaGRIDCOL>
          <FixturaGRIDCOL span={8}>
            <DisplayAccountRenders params={params} />
            <AccountTheming params={params} />
            <AccountSubscription params={params} />
          </FixturaGRIDCOL>
        </FixturaGRIDOUTER>
      </FixturaSection> 
    </>
  );
}

// <FixturaPageHeader subheading={`Home`} params={params} />
