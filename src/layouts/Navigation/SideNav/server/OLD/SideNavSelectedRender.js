// APIS
import { getAccount } from "@/api/accounts";
import { getRenders } from "@/api/renders";

// Utils
import { GetTheLot } from "@/utils/actions";
import { H } from "@/components/Type/Headers";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaStack } from "@/components/containers/stack";
import { SideNavSelectedRender } from "@/layouts/Navigation/SideNav/client/OLD/SideNavSelectedRender";

export default async function SideNav_SelectedRender({ params }) {
  const account = await getAccount(params.id);
  const renderData = await getRenders(params.render);
  const TheLot = GetTheLot(account, renderData.attributes);
  const LINKPREPATH = `/${params.id}/${params.render}`;
  const DATAOBJ = TheLot.assets;
  console.log("Page.js - SideNav_SelectedRender")
  return (
    <>
      <FixturaStack>
        <FixturaBox>
          <H size="h5" align="right">
            Select a Categories
          </H>
        </FixturaBox> 
        <SideNavSelectedRender DATAOBJ={DATAOBJ} LINKPREPATH={LINKPREPATH} />
      </FixturaStack>
    </>
  );
} 
