import { getAccount } from "@/api/accounts";
import { getAssets } from "@/api/assets";
import { getRenders } from "@/api/renders";
import { getScheduler } from "@/api/scheduler";
import { BackButton } from "@/components/Navigation/BackBtn";
import { H } from "@/components/Type/Headers";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaPaper } from "@/components/containers/paper";
import { AssetTypeGridLayout } from "@/layouts/Grids/AssetTypeGrid";
import { FixturaPageHeader } from "@/layouts/Headings/PageHeader";
import {
  groupByCategoryAndGameId,
  groupDownloadsByAssetCategory,
  filterByAssetId,
  FindAccountLabel,
  FindAccountLogo
} from "@/utils/actions";

export default async function Upage({ params }) {
  const { id, render } = params;
  const UIDS = [1, 2, 3, 19, 20];
  const account = await getAccount(id);
  const scheduler = await getScheduler(account?.attributes.scheduler.data.id);
  // If you are going to use the render and asset data, uncomment the lines below:
  const renderData = await getRenders(render);
  const assets = await getAssets();

  let filteredWriteups = filterByAssetId(
    renderData.attributes.gtp_3_reports.data,
    UIDS
  );
  const GroupedAndOrdered = groupByCategoryAndGameId(filteredWriteups);

  let filteredDownloads = filterByAssetId(
    renderData.attributes.downloads.data,
    UIDS
  );
  const DownloadsGroupedAndOrdered =
    groupDownloadsByAssetCategory(filteredDownloads);

   
  return (
    <>
      <FixturaPageHeader
        heading={FindAccountLabel(account)}
        subheading={`UPCOMING EVENTS`}
        Logo={FindAccountLogo(account)}
      />
      {filteredWriteups.length === 0 ? (
        <NoResults />
      ) : (
        <AssetTypeGridLayout
          WriteUpDATA={GroupedAndOrdered}
          DownloadData={DownloadsGroupedAndOrdered}
          Videos={DownloadsGroupedAndOrdered[1]}
          Images={DownloadsGroupedAndOrdered[2]}
          account={account}
          scheduler={scheduler}
          renderData={renderData}
          assets={assets}
          params={params}
          assetType={`upcoming`}
        
        />
      )}
    </>
  );
}

const NoResults = () => {
  return (
    <FixturaPaper>
      <FixturaBox>
        <H size="h4">No Upcoming Games Found in this render.</H>
        <BackButton />
      </FixturaBox>
    </FixturaPaper>
  );
};
