import { getAccountFields } from "@/api/accounts";
import { FindAccountLabel } from "@/utils/actions";
export default async function AssetLayout({ children, params }) {
    return children;
  }
export const generateMetadata = async ({ params }) => {
  const accountBasic = await getAccountFields(params.id, [
    "account_type",
    "clubs",
    "associations",
  ]);
  return {
    title: `League Tables| ${FindAccountLabel(accountBasic)} | ${
      accountBasic.attributes.Sport
    }`,
  };
  };