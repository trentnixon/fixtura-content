import { getAccount } from "@/api/accounts";
import { getScheduler } from "@/api/scheduler";
import { RenderNavigation } from "@/components/RenderNavigation";
import { SubNavbar } from "@/components/SubNavBar";

export default async function RootLayout({ children, params }) {
  const { id, render } = params;
  console.log(params);

  const account = await getAccount(id);
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
            <div className="p-6 bg-white rounded shadow">{children}</div>
          </div>
        </div>
      </main>
    </>
  );
}
