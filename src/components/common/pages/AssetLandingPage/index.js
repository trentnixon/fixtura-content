"use client";
// APIS
// Structure
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
// Components
import { FixturaSection } from "@/components/containers/Section";
import { SelectedStatsStatement } from "@/components/PageSelectedRender/server/RenderStatsStatment";
import NavigationOptionsForAccountType from "@/components/PageOverview/NavigationOptionsForAccountType";
//import { UserFeedback } from "@/components/PageSelectedRender/client/ContactUsFeedBack";

import { FixturaGroup } from "@/components/containers/Group";
import {
  BarListAssetBreakDown,
  PieAssetDivide,
} from "@/components/PageOverview/Charts/BarList";

import { NewTemplateAnnouncement } from "@/components/common/pages/ListBundleLibrary/NewTemplateAnnouncement";
import { GlobalHeaderNotifications } from "@/components/common/pages/AssetLandingPage/components/GlobalHeaderNotifications";

export default function AssetLandingPage() {
  return (
    <FixturaGRIDOUTER>
      <GlobalHeaderNotifications />
      <FixturaGRIDCOL span={12}>
        <FixturaSection
          shade={0}
          Title={`Selected Bundle`}
          subTitle={``}
          Icon={`ICO_HEADER_ARTICLE`}
        >
          <SelectedStatsStatement />
        </FixturaSection>
      </FixturaGRIDCOL>
      <FixturaGRIDCOL span={12}>
        <NavigationOptionsForAccountType />
      </FixturaGRIDCOL>
      <FixturaGRIDCOL span={12}>
        <FixturaGroup>
          <BarListAssetBreakDown />
          <PieAssetDivide />
        </FixturaGroup>
      </FixturaGRIDCOL>
      <FixturaGRIDCOL span={12}>
        <NewTemplateAnnouncement />
      </FixturaGRIDCOL>
    </FixturaGRIDOUTER>
  );
} 
