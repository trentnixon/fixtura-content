// APIS
import { getAccount, getAccountFields } from "@/api/accounts";
import { RenderCount, getRenders } from "@/api/renders";
 
// Structure
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
// Components
import { FixturaSection } from "@/components/containers/Section";
import { SelectedStatsStatement } from "@/components/PageSelectedRender/server/RenderStatsStatment";
import NavigationOptionsForAccountType from "@/components/PageOverview/NavigationOptionsForAccountType";
//import { UserFeedback } from "@/components/PageSelectedRender/client/ContactUsFeedBack";
import { FindAccountLabel, FindAccountType } from "@/utils/actions";
import { FixturaGroup } from "@/components/containers/Group";
import {
  BarListAssetBreakDown,
  PieAssetDivide,
} from "@/components/PageOverview/Charts/BarList";
//import { NewTemplatePromo } from "@/components/Promotions/NewTemplatePromotion";
import { CNSWTemplateNewLayout } from "@/components/Promotions/CNSWTemplateNewLayout";
import { P } from "@/components/Type/Paragraph";
import { FixturaPaper } from "@/components/containers/paper";

export default async function Render({ params }) {
  const account = await getAccount(params.id);
  const AccountType = FindAccountType(account);

  const getRenderCount = await RenderCount(params.render)
  console.log("RenderCount(params.render)", getRenderCount)

  const OBJ = {
    Count: await RenderCount(params.render),
    CompleteRender: await getRenders(params.render),
    accountBasic: account,
    AccountType: AccountType,
    params: params,
    Sport: account.attributes?.Sport
      ? account.attributes?.Sport.toLowerCase()
      : "afl",
  };

  return (
    <FixturaGRIDOUTER>
      <GlobalHeaderNotifications show={false} />
      <FixturaGRIDCOL span={12}>
        <FixturaSection
          shade={0}
          Title={`Selected Bundle`}
          subTitle={``}
          Icon={`ICO_HEADER_ARTICLE`}
        >
          <SelectedStatsStatement Count={OBJ.Count} />
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

const GlobalHeaderNotifications = ({show}) => {
  if(!show)
  return null;
  return (
    <FixturaGRIDCOL span={12}>
      <FixturaPaper c={8}>
        <P mx={10} my={15} c={"white"}>
          🔔 Network Outage Update [Date: 2024-01-16]
        </P>
        <P mx={10} my={15} c={"white"}>
          We sincerely apologize for the delays and errors experienced with
          today&apos;s renders. Our team has been diligently working throughout
          the morning to resolve the network issues that occurred during the
          overnight rendering of your assets.
        </P>
        <P mx={10} my={15} c={"white"}>
          As of now, we have implemented a temporary solution and are actively
          developing a more robust fix in the coming days. If you find any of
          your assets to be incorrect or missing, please don&apos;t hesitate to
          contact us via our Facebook page. We are here to assist and ensure
          everything is sorted out promptly
        </P>
        <P mx={10} my={15} c={"white"}>
          We are here to assist and ensure everything is sorted out promptly
        </P>
      </FixturaPaper>
    </FixturaGRIDCOL>
  );
};
