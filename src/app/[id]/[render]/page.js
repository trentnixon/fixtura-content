// APIS
// Structure
import { FixturaSection } from "@/components/containers/Section";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";


// Components
//import SideNav_SelectedRender from "@/layouts/Navigation/SideNav/server/SideNavSelectedRender";
/* import { SectionHeaderWithSubHeader } from "@/layouts/Headings/SectionHeaderWithSubHeader";
import { SelectedRenderStats } from "@/components/PageSelectedRender/server/StatsGroup";
import { SelectedRenderStatsRings } from "@/components/PageSelectedRender/server/StatsRings";
import { P } from "@/components/Type/Paragraph";
 */

/* import { BarChartArticleType } from "@/components/charts/server/client/BarChartArticleType";
import { PieChartArticleType } from "@/components/charts/server/client/PiechartArticleType";
import { PieChartDownloadableMedia } from "@/components/charts/server/client/PiechartDownloadableMedia";
import { BarChartCategoryType } from "@/components/charts/server/client/BarChartByCategoryType";
import { CategoryStatAndCTA } from "@/components/PageSelectedRender/client/CategoryStatAndCTA";
 */

import { RenderCount } from "@/api/renders";
import { Icon123 } from "@tabler/icons-react";
import { CategoryCard } from "@/components/Cards/CategoryCard";
import { SelectedStatsStatment } from "@/components/PageSelectedRender/server/RenderStatsStatment";

export default async function Render({ params }) {
  console.log("Page.js - Render");

  const Count = await RenderCount(params.render);

  return (
    <>
      <FixturaSection shade={0} Title={""} subTitle={""}>
        <FixturaGRIDOUTER>
          <FixturaGRIDCOL span={12}>
            <SelectedStatsStatment Count={Count} />
          </FixturaGRIDCOL>

          <FixturaGRIDCOL span={4}>
            <CategoryCard
              IMG={`https://fixtura.s3.ap-southeast-2.amazonaws.com/Score_Card_BG_f55e00c64d.png`}
              OBJ={[
                {
                  title: "Games",
                  value: Count.GameCount.Results,
                },
                {
                  title: "Articles",
                  value: Count.finalStructure.articles.results,
                  icon: <Icon123 />,
                },
                {
                  title: "Downloads",
                  value: Count.finalStructure.media.statistics,
                  icon: <Icon123 />,
                },
              ]}
              icon={<Icon123 />}
              Category={"Game Results"}
              color="teal"
              c="9"
              Link={`/${params.id}/${params.render}/r`}
            />
          </FixturaGRIDCOL>
          <FixturaGRIDCOL span={4}>
            <CategoryCard
              OBJ={[
                {
                  title: "Games",
                  value: Count.GameCount.Upcoming,
                  icon: <Icon123 />,
                },
                {
                  title: "Articles",
                  value: Count.finalStructure.articles.upcoming,
                  icon: <Icon123 />,
                },
                {
                  title: "Downloads",
                  value: Count.finalStructure.media.upcoming,
                  icon: <Icon123 />,
                },
              ]}
              icon={<Icon123 />}
              Category={"Upcoming Fixtures"}
              color="green"
              c="2"
              Link={`/${params.id}/${params.render}/u`}
              IMG={`https://fixtura.s3.ap-southeast-2.amazonaws.com/upcomingbg_0cf77f0641.png`}
            />
          </FixturaGRIDCOL>

          <FixturaGRIDCOL span={4}>
            <CategoryCard
              IMG={`https://fixtura.s3.ap-southeast-2.amazonaws.com/statistics_BG_2947c967d1.png`}
              OBJ={[
                {
                  title: "Assets",
                  value: Count.finalStructure.statistics,
                  icon: <Icon123 />,
                },
                {
                  title: "Articles",
                  value: Count.finalStructure.articles.statistics,
                  icon: <Icon123 />,
                },
                {
                  title: "Downloads",
                  value: Count.finalStructure.statistics,
                  icon: <Icon123 />,
                },
              ]}
              icon={<Icon123 />}
              Category={"Weekend Statistics"}
              color="orange"
              c="9"
              Link={`/${params.id}/${params.render}/o`}
            />
          </FixturaGRIDCOL>
        </FixturaGRIDOUTER>
      </FixturaSection>
    </>
  );
}
// <SelectedRenderStats params={params} />
/*
<FixturaGRIDCOL span={4}>
            <SideNav_SelectedRender params={params} />
          </FixturaGRIDCOL>
*/
/*  <FixturaSection shade={0} Title={""} subTitle={""}>
        <FixturaGRIDOUTER>
          <FixturaGRIDCOL span={7}></FixturaGRIDCOL>
          <FixturaGRIDCOL span={5}>
            <P>Barchart of grades and num of items in each</P>
          </FixturaGRIDCOL>
        </FixturaGRIDOUTER>
      </FixturaSection> */

/*
        <FixturaGRIDCOL span={12}>
            <SelectedRenderStatsRings params={params} />
          </FixturaGRIDCOL>
          <FixturaGRIDCOL span={6}>
            <PieChartDownloadableMedia Count={Count} />
          </FixturaGRIDCOL>

          <FixturaGRIDCOL span={6}>
            <PieChartArticleType Count={Count} />
          </FixturaGRIDCOL>

          <FixturaGRIDCOL span={6}>
            <BarChartCategoryType Count={Count} />
          </FixturaGRIDCOL>
          <FixturaGRIDCOL span={6}>
            <BarChartArticleType Count={Count} />
          </FixturaGRIDCOL>
      */
