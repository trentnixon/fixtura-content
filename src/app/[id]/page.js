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
  const { id } = params;
  const account = await getAccount(id);
  const scheduler = await getScheduler(account?.attributes.scheduler.data.id);

  return (
    <>
      <SubNavbar PATH={id} DATA={scheduler?.attributes?.renders?.data} />

      <main>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="col-span-1 md:col-span-1">
            <div className="p-6 bg-white rounded shadow">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Account Page
              </h2>
              
            </div>
          </div>
          <div className="col-span-1 md:col-span-2">
            <div className="p-6 bg-white rounded shadow">
              <DisplaySelectedRender />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

const DisplaySelectedRender = () => {
  return <>DisplaySelectedRender</>;
};

const TestPage = ({ account }) => {
  return (
    <>
      <Items />
    </>
  );
};

const Items = () => {
  return (
    <>
      <h1>Assets</h1>
      <p>write ups</p>
      <p>Videos</p>
      <p>Images</p>

      <p>Images</p>
      <h1>Functionality</h1>
      <p>View and copy write ups. Edit, rewrite and add context to writeups</p>
      <p>View and DOwnload Videos</p>
      <p>View and DOwnload Images</p>

      <p>Organisation</p>

      <p>
        Club {">"} select Comp {">"} Select a Team {">"} SHow Asset options{" "}
      </p>
    </>
  );
};
