// APIS
import { getAccount, getAccountFields } from "@/api/accounts";
import { RenderCount, getRenders } from "@/api/renders";

// Structure
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
// Components
import { FixturaSection } from "@/components/containers/Section";
import { SelectedStatsStatment } from "@/components/PageSelectedRender/server/RenderStatsStatment";
import NavigationOptionsForAccountType from "@/components/PageOverview/NavigationOptionsForAccountType";
import { UserFeedback } from "@/components/PageSelectedRender/client/ContactUsFeedBack";
import { FindAccountLabel, FindAccountType } from "@/utils/actions";
import { FixturaGroup } from "@/components/containers/Group";
import {
  BarListAssetBreakDown,
  PieAssetDivide,
} from "@/components/PageOverview/Charts/BarList";
//import { NewTemplatePromo } from "@/components/Promotions/NewTemplatePromotion";
import { CNSWTemplateNewLayout } from "@/components/Promotions/CNSWTemplateNewLayout";

export default async function Render({ params }) {
  const account = await getAccount(params.id);
  const AccountType = FindAccountType(account);
  const OBJ = {
    Count: await RenderCount(params.render),
    CompleteRender: await getRenders(params.render),
    accountBasic: account,
    AccountType: AccountType,
    params: params,
    Sport: account.attributes?.Sport
      ? account.attributes?.Sport.toLowerCase()
      : "cricket",
  };

  return (
    <FixturaGRIDOUTER>
      <FixturaGRIDCOL span={12}>
        <FixturaSection
          shade={0}
          Title={`Selected Bundle`}
          subTitle={``}
          Icon={`ICO_HEADER_ARTICLE`}
        >
          <SelectedStatsStatment Count={OBJ.Count} />
        </FixturaSection>
      </FixturaGRIDCOL>
      <FixturaGRIDCOL span={12}>
        <NavigationOptionsForAccountType OBJ={OBJ} />
      </FixturaGRIDCOL>
      <FixturaGRIDCOL span={12}>
        <FixturaGroup>
          <BarListAssetBreakDown OBJ={OBJ} />
          <PieAssetDivide OBJ={OBJ} />
        </FixturaGroup>
      </FixturaGRIDCOL>
      <FixturaGRIDCOL span={12}>
        <CNSWTemplateNewLayout />
      </FixturaGRIDCOL>
    </FixturaGRIDOUTER>
  );
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
