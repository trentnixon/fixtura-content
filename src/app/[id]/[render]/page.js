import { getAccount, getAllAccount } from "@/api/accounts";
import { getScheduler } from "@/api/scheduler";
import { RenderNavigation } from "@/components/RenderNavigation";
import { SubNavbar } from "@/components/SubNavBar";

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
  // const renderData = await getRender(render);
  // const assets = await getAssets();

  return (
    <>
      <SubNavbar PATH={id} DATA={scheduler?.attributes?.renders?.data} />

      <main>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="col-span-1 md:col-span-1">
            <div className="p-6 bg-white rounded shadow">
              <RenderNavigation params={params} />
              Navigation
              Render Page
            </div>
          </div>
          <div className="col-span-1 md:col-span-2">
            <div className="p-6 bg-white rounded shadow">
              Select a Asset Option
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
