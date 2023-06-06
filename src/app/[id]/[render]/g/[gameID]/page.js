
import { getAccount, getAllAccount } from "@/api/accounts";
import { getGame, getGames } from "@/api/getGame";
import { getAllRenders } from "@/api/renders";
import { getScheduler } from "@/api/scheduler";
import { RenderNavigation } from "@/components/RenderNavigation";
import { SubNavbar } from "@/components/SubNavBar";
import { DisplayWriteup } from "@/components/displayWriteups";


export default async function Render({ params }) {
  const { id, render, gameID } = params;

/*   const account = await getAccount(id);
  const scheduler = await getScheduler(account?.attributes.scheduler.data.id); */
  const game = gameID ? await getGame(gameID) : null;

  return (
    <DisplayWriteup game={game} />
  );
}
