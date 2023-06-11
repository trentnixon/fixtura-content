import { getFullAccount, getAllAccount } from "@/api/accounts";
import { getScheduler } from "@/api/scheduler";
import { SubNavbar } from "@/components/SubNavBar";
import { AccountHomeGridLayout } from "@/layouts/AccountHomeLayout";

export async function generateStaticParams() {
  const accounts = await getAllAccount();

  return accounts.map((account) => ({
    id: account.id.toString(),
  }));
}

export default async function Account({ params }) {
  const { id, render } = params;

  const accountFull = await getFullAccount(id);
  const scheduler = await getScheduler(
    accountFull?.attributes.scheduler.data.id
  );
  console.log("Render accountFull");
  console.log(accountFull);
  return ( 
    <AccountHomeGridLayout 
      account={accountFull}
      scheduler={scheduler}
      params={params}
      subscription_tier={accountFull.attributes.subscription_tier}
      clubs={accountFull.attributes.clubs}
      associations={accountFull.attributes.associations}
      account_type={accountFull.attributes.account_type}
      template={accountFull.attributes.template}
      theme={accountFull.attributes.theme}
      audio_option={accountFull.attributes.audio_option}
    />
  );
}
