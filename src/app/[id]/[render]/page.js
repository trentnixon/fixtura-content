import { getAccount, getAllAccount } from "@/api/accounts";
import { getAllRenders } from "@/api/renders";
import { getScheduler } from "@/api/scheduler";
import { RenderNavigation } from "@/components/RenderNavigation";
import { SubNavbar } from "@/components/SubNavBar";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 10,
  fetchCache = "auto";

export async function generateStaticParams() {
  // fetch data for both accounts and renders

  const accounts = await getAllAccount();
  const renders = await getAllRenders();

  // create a paths array combining all possible combinations of account ids and render ids
  const paths = accounts.flatMap(account =>
    renders.map(render => ({
      params: { id: account.id.toString(), render: render.id.toString() },
    }))
  );

  return paths;
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