// APIS
// Structure
import { getAccountFields } from "@/api/accounts";
import { FindAccountLabel } from "@/utils/actions";
import ListBundleLibrary from "@/components/common/pages/ListBundleLibrary";

export default  function Account(props) {
  return <ListBundleLibrary {...props} />;
}

// UTILS FUNC
export const generateMetadata = async ({ params }) => {
  const accountBasic = await getAccountFields(params.id, [
    "account_type",
    "clubs",
    "associations",
  ]);
  return {
    title: `Netball Bundles | ${FindAccountLabel(accountBasic)} | ${
      accountBasic.attributes.Sport
    }`,
  };
};
