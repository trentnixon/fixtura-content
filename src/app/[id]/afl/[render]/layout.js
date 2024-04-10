import { getAccountFields } from "@/api/accounts";
import { FindAccountLabel } from "@/utils/actions";

// add a slug checker to make sure it is no undefined!!!
export default async function RootLayout({ children, params }) {
  return children;
}

export const generateMetadata = async ({ params }) => {
  const accountBasic = await getAccountFields(params.id, [
    "account_type",
    "clubs",
    "associations",
  ]);
  return {
    title: `Bundle ${params.render} Selected | ${FindAccountLabel(
      accountBasic
    )} | ${accountBasic.attributes.Sport}`,
  };
};
 