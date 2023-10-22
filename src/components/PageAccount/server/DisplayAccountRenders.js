import { getSchedulerFromAccount } from "@/api/scheduler";
import { RendersTableof } from "@/components/PageAccount/client/RendersTableof";

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

  return (
    <FixturaComponent>
      <FixturaStack align="left">
        <SectionHeaderWithSubHeader
          Main="Renders"
          Sub={`${RENDERS.length} Available`}
        />

        <RendersTableof RENDERS={RENDERS} params={params} />

        <FixturaBox c={8}>
          <FixturaGRIDOUTER>
            <FixturaGRIDCOL span={1}>
              <ICO_INFO />
            </FixturaGRIDCOL>
            <FixturaGRIDCOL span={11}>
              <P c={"gray.1"}>
                To select a bundle, identify the one you&rsquo;re interested in
                by its listed date. Upon selection, you&rsquo;ll be able to view
                its details, copy pertinent information, or download related
                assets. This functionality extends to all upcoming games and
                past game results.
              </P>
            </FixturaGRIDCOL>
          </FixturaGRIDOUTER>
        </FixturaBox>
      </FixturaStack>
    </FixturaComponent>
  );
}
