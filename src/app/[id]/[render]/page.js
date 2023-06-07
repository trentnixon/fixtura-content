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
  //const account = await getAccount(id);
  //const scheduler = await getScheduler(account?.attributes.scheduler.data.id);

  // If you are going to use the render and asset data, uncomment the lines below:
  // const renderData = await getRender(render);
  // const assets = await getAssets();

  return (
    <>
    <h2>ID : {id}, render {render}</h2>
     Render page. About this render and select a asset category.

     Upcoming, Results, Overviews/round ups
    </>
  );
}
