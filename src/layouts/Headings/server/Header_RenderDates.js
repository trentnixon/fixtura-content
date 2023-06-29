// APIS

import { RenderCount, getRenderFields } from "@/api/renders";
import { FixturaGroup } from "@/components/containers/Group";
import { FixturaContainer } from "@/components/containers/containers";
import { RenderDates } from "@/layouts/Headings/client/RenderDates";
// Utils
import { ComplieRenderData } from "@/utils/actions";
import { AccountNameAndLogo } from "@/components/Images/server/AccountNameAndLogo";

export default async function Header_RenderDates({ params }) {
  const renderData = await getRenderFields(params.render, []);
  const Count = await RenderCount(params.render);

  return (
    <FixturaContainer my={0}>
      <FixturaGroup position='right'>
       {/*  <RenderDates
          createdAt={ComplieRenderData(renderData.attributes)}
          Assets={Count.downloads + Count.gtp_3_reports}
        /> */}

        <div>
          <AccountNameAndLogo params={params} />
        </div>
      </FixturaGroup>
    </FixturaContainer>
  );
}
//
