import { getAccount } from "@/api/accounts";
import { getAssets } from "@/api/assets";
import { getRenders } from "@/api/renders";
import { getScheduler } from "@/api/scheduler";
import { FixturaGroup } from "@/components/containers/Group";
import { FixturaContainer } from "@/components/containers/containers";
import { FixturaPaper } from "@/components/containers/paper";
import { AssetTypeGridLayout } from "@/layouts/Grids/AssetTypeGrid";
import {
  groupByCategoryAndGameId,
  groupDownloadsByAssetCategory,
  filterByAssetId,
  FindAccountLabel,
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
  let filteredDownloads = filterByAssetId(
    renderData.attributes.downloads.data,
    UIDS
  );

  const GroupedAndOrdered = groupByCategoryAndGameId(filteredWriteups);
  const DownloadsGroupedAndOrdered =
    groupDownloadsByAssetCategory(filteredDownloads);

  return (
    <>
      <FixturaContainer>
        <FixturaPaper>
          <FixturaGroup>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {FindAccountLabel(account)}
            </h1>
            <h1>Upcoming Events</h1>
          </FixturaGroup>
        </FixturaPaper>
      </FixturaContainer>
      <AssetTypeGridLayout
        WriteUpDATA={GroupedAndOrdered}
        DownloadData={DownloadsGroupedAndOrdered}
        account={account}
        scheduler={scheduler}
        renderData={renderData}
        assets={assets}
        params={params}
      />
    </>
  );
}
