import { getAccount, getAllAccount } from "@/api/accounts";
import { getScheduler } from "@/api/scheduler";
import { SubNavbar } from "@/components/SubNavBar";

export async function generateStaticParams() {
  const accounts = await getAllAccount();

  return accounts.map((account) => ({
    id: account.id.toString(),
  }));
}

export default async function Account({ params }) {
  const { id, render } = params;
  const account = await getAccount(id);
  const scheduler = await getScheduler(account?.attributes.scheduler.data.id);

  return (
    <>
      <main>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1>Accout page</h1>
          <h2>ID : {id}, render {render}</h2>
          <p>Selector for renders, select a render to continue</p>
          <div className="col-span-1 md:col-span-3">
            <div className="p-6 bg-white rounded shadow">
              <SubNavbar
                PATH={id}
                DATA={scheduler?.attributes?.renders?.data}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
