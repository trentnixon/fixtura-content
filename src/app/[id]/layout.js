import { getAccount } from "@/api/accounts";
import { ContentShell } from "@/layouts/AppShell";
import { CookieCutter } from "@/utils/cookiecutter";
export default async function RootLayout({ children, params }) {

  const accountBasic = await getAccount(params.id, [
    "account_type",
    "clubs",
    "associations",
    "sponsors",
    "subscription_tier",
  ]);
 
  return (
    <ContentShell params={params} accountBasic={accountBasic}>
      <CookieCutter>
        <main>{children}</main>
      </CookieCutter>
    </ContentShell>  
  );
}  
