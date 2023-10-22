// APIS

// Structure
import { FixturaPageHeader } from "@/layouts/Headings/PageHeader";
import { FixturaSection } from "@/components/containers/Section";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";

// Components
import Header_RenderDates from "@/layouts/Headings/server/Header_RenderDates";
import SideNav_SelectedCategory from "@/layouts/Navigation/SideNav/server/SideNavSelectedCategory";
import { CreateVideo } from "@/components/Video/server/createVideo";
import { SupportingArticleServer } from "@/components/Articles/server/supportingArticles";

export default async function Upage({ params }) {
  console.log("Page.js - Upage");

  return (
    <>
      <FixturaPageHeader
        subheading={`VIDEOS : UPCOMING EVENTS `}
        params={params}
      />
      <FixturaSection shade={0} Title={""} subTitle={""}>
        <Header_RenderDates params={params} />
        <FixturaGRIDOUTER>
          <FixturaGRIDCOL span={3}>
            <SideNav_SelectedCategory
              params={params}
              Path={"u"}
              Category="Videos"
            />
          </FixturaGRIDCOL>
          <FixturaGRIDCOL span={9}>
            <CreateVideo
              params={params}
              Path={"u"}
              Category="Video options"
              Type="upcoming"
            />
            <SupportingArticleServer
              params={params}
              Path={"u"}
              Type="upcoming"
            />
          </FixturaGRIDCOL>
        </FixturaGRIDOUTER>
      </FixturaSection>
    </>
  );
}
