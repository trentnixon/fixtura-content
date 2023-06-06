
import { getAccount, getAllAccount } from "@/api/accounts";
import { getGame, getGames } from "@/api/getGame";
import { getAllRenders } from "@/api/renders";
import { getScheduler } from "@/api/scheduler";
import { RenderNavigation } from "@/components/RenderNavigation";
import { SubNavbar } from "@/components/SubNavBar";
import { DisplayWriteup } from "@/components/displayWriteups";

/* export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 10,
  fetchCache = "auto"; */
export const  revalidate = 10, fetchCache = true;

export async function generateStaticParams() {
  const accounts = await getAllAccount();
  const renders = await getAllRenders();
  const games = await getGames();

  const paths = [];

  for (const account of accounts) {
    for (const render of renders) {
      for (const game of games) {
        paths.push({
          params: {
            id: account.id.toString(),
            render: render.id.toString(),
            gameID: game.attributes.gameID,
          },
        });
      }
    }
  }

  return paths;
}


export default async function Render({ params }) {
  const { id, render, gameID } = params;

  const account = await getAccount(id);
  const scheduler = await getScheduler(account?.attributes.scheduler.data.id);
  const game = gameID ? await getGame(gameID) : null;

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
              <DisplayWriteup game={game} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
