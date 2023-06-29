import { getAccount } from "@/api/accounts";
import { getGameByID } from "@/api/getGame";
import { DisplayWriteup } from "@/components/Articles/displayGameArticles";
import { FixturaPageHeader } from "@/layouts/Headings/PageHeader";
import { FindAccountLabel,FindAccountLogo } from "@/utils/actions";

export default async function GameIDPage({ params }) {
  const displayGame = await getGameByID(params.gameID);
  const account = await getAccount(params.id);

  return (
    <>
      <FixturaPageHeader
        heading={FindAccountLabel(account)}
        subheading={`Writeups`}
        Logo={FindAccountLogo(account)}
      /> 
      <DisplayWriteup game={displayGame} />;  
    </> 
  );
}
