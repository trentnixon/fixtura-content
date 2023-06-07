import { getGameByID } from "@/api/getGame";
import { DisplayWriteup } from "@/components/Articles/displayGameArticles";
import BackBtn from "@/components/Navigation/BackBtn";

export default async function GameIDPage({ params }) {
  console.log("params.gameID", params.gameID);
  const displayGame = await getGameByID(params.gameID);
  console.log("DisplayGame ", displayGame);
  return (
    <>
      <BackBtn />
      <DisplayWriteup game={displayGame} />
    </>
  );
}
