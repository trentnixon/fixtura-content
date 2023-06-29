// APIS

// Utils
import { getRenderFields } from "@/api/renders";
import { H } from "@/components/Type/Headers";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaStack } from "@/components/containers/stack";
import { SideNavSelectedCategory } from "@/layouts/Navigation/SideNav/client/SideNavSelectedStatistics";
import { filterDownloads } from "@/utils/helpers";

export default async function SideNav_SelectedStatistics(props) {
  const { params, Path,Type,Category } = props;
  const LINKPREPATH = `/${params.id}/${params.render}/${Path}`;
  console.log("Page.js - SideNav_SelectedStatistics");
 
  const renderData = await getRenderFields(params.render, [
    "downloads",
    "downloads.asset_type",
    "downloads.asset_category",
  ]);

  // Usage:
  const filteredDownloads = filterDownloads(
    renderData.attributes.downloads.data,
    Category,
    Type
  );



  return (
    <>
      <FixturaStack>
        <FixturaBox>
          <H size="h5" align="right">
            OPTIONS
          </H>
        </FixturaBox>
        <SideNavSelectedCategory LINKPREPATH={LINKPREPATH} {...props} ITEMS={filteredDownloads}/>
      </FixturaStack>
    </>
  );
}
