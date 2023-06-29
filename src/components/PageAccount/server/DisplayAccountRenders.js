import { getSchedulerFromAccount } from "@/api/scheduler";
import {RendersTableof} from "@/components/PageAccount/client/RendersTableof";

import { P } from "@/components/Type/Paragraph";
import { ICO_INFO } from "@/components/UI/Icons";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaComponent } from "@/components/containers/containers";
import { FixturaStack } from "@/components/containers/stack";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { SectionHeaderWithSubHeader } from "@/layouts/Headings/SectionHeaderWithSubHeader";

export default async function DisplayAccountRenders({ params }) {
  const scheduler = await getSchedulerFromAccount(params.id);
  const RENDERS = scheduler.attributes.renders.data; 
  //console.log("RENDERS", RENDERS)
  return (
    <FixturaComponent>
      <FixturaStack align='left'>
        <SectionHeaderWithSubHeader
          Main="Renders"
          Sub={`${RENDERS.length} Available`}
        />

        <RendersTableof RENDERS={RENDERS} params={params} />
 
        <FixturaBox c={4}>
          <FixturaGRIDOUTER>
            <FixturaGRIDCOL span={1}>
              <ICO_INFO />
            </FixturaGRIDCOL>
            <FixturaGRIDCOL span={11}>
              <P c={"dark"}>
                To select a render, simply locate the one you are interested in
                using the date listed. Once selected, you&rsquo;ll have the
                options to review its details, copy any relevant information, or
                even download any associated assets. This applies to all
                upcoming games, previous game results, as well as any
                statistical assets.
              </P>
            </FixturaGRIDCOL>
          </FixturaGRIDOUTER>
        </FixturaBox>
      </FixturaStack>
    </FixturaComponent>
  );
}
