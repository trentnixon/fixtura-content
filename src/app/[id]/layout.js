import { getAccount } from "@/api/accounts";
import { getScheduler } from "@/api/scheduler";
import { ContentShell } from "@/layouts/AppShell";

export default async function RootLayout({ children, params }) {
  //console.log("RootLayout Account : params", params)
  const { id, render } = params;
/* 
  const account = await getAccount(id);
  const scheduler = await getScheduler(account?.attributes.scheduler.data.id); */
  return (
    <ContentShell params={params}>
      <main>{children}</main>
    </ContentShell>
  ); 
}
