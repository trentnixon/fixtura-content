import { getAccount } from "@/api/accounts";
import { getScheduler } from "@/api/scheduler";

export default async function RootLayout({ children, params }) {
  const { id, render } = params;
  //console.log("RootLayout Render Params: ", params);

  const account = await getAccount(id);
  const scheduler = await getScheduler(account?.attributes.scheduler.data.id);
  return <>{children}</>;
}
