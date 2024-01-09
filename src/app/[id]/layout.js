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

  const trialDaysRemaining = calculateRemainingDays(
    accountBasic?.attributes?.trial_instance?.data?.attributes.endDate
  );

  const OBJ = {
    accountBasic: accountBasic, 
    params: params,
    trialDaysRemaining: trialDaysRemaining,
    isActive:
      accountBasic.attributes?.trial_instance?.data?.attributes?.isActive,
      Sport: accountBasic.attributes?.Sport ? accountBasic.attributes?.Sport.toLowerCase():'cricket',
  }; 

  return (
    <ContentShell params={params} accountBasic={accountBasic} OBJ={OBJ}>
      <CookieCutter>
        <main>{children}</main>
      </CookieCutter>
    </ContentShell>
  );
}

const calculateRemainingDays = (endDate) => {
  const today = new Date();
  const end = new Date(endDate);
  return Math.ceil((end - today) / (1000 * 60 * 60 * 24));
};
