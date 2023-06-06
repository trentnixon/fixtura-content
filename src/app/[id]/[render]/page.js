import { getSubscriptionTier } from "@/api/SubscriptionTier";
import { getAccount } from "@/api/accounts";
import { getAssets } from "@/api/assets";
import { getAllRenders, getRenders } from "@/api/renders";
import { getScheduler } from "@/api/scheduler";
import { RenderNavigation } from "@/components/RenderNavigation";
import { SubNavbar } from "@/components/SubNavBar";
import { FindAccountLabel } from "@/utils/actions";

import { fetcher } from "@/utils/fetcher";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 10,
  fetchCache = "auto";

export async function generateStaticParams() {
  const renders = await getAllRenders()
  
  return renders.map((render) => ({
    render: render.id,
  }));
}

export default async function Render({ params }) {
  const { id, render } = params;

  const account = await getAccount(id);
  const renders = await getRenders(render);
  const Assets = await getAssets();
  const scheduler = await getScheduler(account?.attributes.scheduler.data.id);

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