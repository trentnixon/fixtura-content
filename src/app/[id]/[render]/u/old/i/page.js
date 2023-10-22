// APIS

// Structure
import { FixturaPageHeader } from "@/layouts/Headings/PageHeader";
import { FixturaSection } from "@/components/containers/Section";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";

// Components
import Header_RenderDates from "@/layouts/Headings/server/Header_RenderDates";

import SideNav_SelectedCategory from "@/layouts/Navigation/SideNav/server/SideNavSelectedCategory";

export default async function UIPage({ params }) {
  console.log("Page.js - UIPage");
  return (
    <>
      <FixturaPageHeader subheading={`UPCOMING EVENTS`} params={params} />
      <FixturaSection shade={0} Title={""} subTitle={""}>
        <Header_RenderDates params={params} />
        <FixturaGRIDOUTER>
          <FixturaGRIDCOL span={4}> 
            <SideNav_SelectedCategory params={params} Path={"u/i"} Category="Images"/>
          </FixturaGRIDCOL>
          <FixturaGRIDCOL span={8}>Images</FixturaGRIDCOL>
        </FixturaGRIDOUTER>
      </FixturaSection>
    </>
  );
}
