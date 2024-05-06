// APIS
import { RenderCount } from "@/api/renders";
// Structure
import { FixturaSection } from "@/components/containers/Section";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
// Components
//import AccountDetails from "@/components/PageAccount/server/AccountDetails";
import DisplayAccountRenders from "@/components/PageAccount/server/DisplayAccountRenders";

import { getAccountFields } from "@/api/accounts";
import {
  FindAccountLabel,
  FindAccountLogo,
  sortRenders,
} from "@/utils/actions";
import { getSchedulerFromAccount } from "@/api/scheduler";
import { NewTemplateAnnouncement } from "@/components/common/pages/ListBundleLibrary/NewTemplateAnnouncement";

export default async function ListBundleLibrary(props) {
  const { params, searchParams } = props;
  const { accountBasic, scheduler } = await fetchAccountData(params.id);
  const rendersWithCount = await prepareRenders(
    scheduler.attributes.renders.data
  );

  const OBJ = {
    searchParams: searchParams,
    params: params,
    accountBasic: accountBasic,
    TYPE: accountBasic.attributes.account_type.data.attributes.Name,
    Logo: FindAccountLogo(accountBasic),
    AccountLabel: FindAccountLabel(accountBasic),
    RENDERS: rendersWithCount,
    Sport: accountBasic.attributes.Sport.toLowerCase(),
  };

  return (
    <>
      <FixturaGRIDOUTER>
        <FixturaGRIDCOL span={12}>
          <FixturaSection
            shade={0}
            Title={"Bundle Library"}
            subTitle={""}
            Icon={`ICO_HEADER_ACCOUNT`}
          >
            <DisplayAccountRenders OBJ={OBJ} />
          </FixturaSection>
        </FixturaGRIDCOL>
        <NewTemplateAnnouncement />
      </FixturaGRIDOUTER>
    </>
  );
}

// UTILS FUNC
// Fetch and prepare account data
async function fetchAccountData(id) {
  const accountBasic = await getAccountFields(id, [
    "account_type",
    "clubs",
    "clubs.Logo",
    "associations",
    "associations.Logo",
  ]);
  const scheduler = await getSchedulerFromAccount(id);
  return { accountBasic, scheduler };
}

// Prepare renders with counts
async function prepareRenders(renders) {
  const sortedRenders = renders.sort(sortRenders);
  return await Promise.all(
    sortedRenders.map(async (render) => {
      const count = await RenderCount(render.id);
      return { ...render, count };
    })
  );
}
