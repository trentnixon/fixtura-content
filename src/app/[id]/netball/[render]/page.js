"use client";
// APIS
import { getAccountFields } from "@/api/accounts";
import { FindAccountLabel } from "@/utils/actions";
import AssetLandingPage from "@/components/common/pages/AssetLandingPage";

export default function NetballRender() {
  return <AssetLandingPage />;
}

// UTILS FUNC
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
