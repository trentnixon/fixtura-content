import { getAccount, getAllAccount } from "@/api/accounts";
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
  const account = await getAccount(id);
  const scheduler = await getScheduler(account?.attributes.scheduler.data.id);

  return (
    <AccountHomeGridLayout
        account={account}
        scheduler={scheduler}
        params={params}
      />
  );
}
