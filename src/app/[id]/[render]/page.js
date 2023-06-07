import { getAccount, getAllAccount } from "@/api/accounts";
import { getAssets } from "@/api/assets";
import { getRenders } from "@/api/renders";
import { getScheduler } from "@/api/scheduler";
import { RenderBaseLayout } from "@/layouts/RenderBaseLayout";

export async function generateStaticParams() {
  // fetch data for both accounts and renders
  const accounts = await getAllAccount();
  return accounts.map((a, i) => {
    if (a.attributes.scheduler.data !== null) {
      //console.log( a.attributes.scheduler.data.attributes.renders)
      return a.attributes.scheduler.data.attributes.renders.data.map((r, i) => {
        return {
          id: a.id,
          render: r.id,
        };
      });
    }
  });
}

export default async function Render({ params }) {
  const { id, render } = params;
  const account = await getAccount(id);
  const scheduler = await getScheduler(account?.attributes.scheduler.data.id);
  // If you are going to use the render and asset data, uncomment the lines below:
  const renderData = await getRenders(render);
  const assets = await getAssets();

  return (
    <RenderBaseLayout
      account={account}
      scheduler={scheduler}
      renderData={renderData}
      assets={assets}
      params={params}
    />
  );
}
