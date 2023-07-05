//import { createStyles, Title, Text, Button, Container, rem } from '@mantine/core';
//import { Dots } from './Dots';
// APIS
import { RenderCount, getRenderFields } from "@/api/renders";
import { AccountNameAndLogoStack } from "@/components/Images/server/AccountNameAndLogo";
import { FixturaHero } from "@/components/containers/containers";
import {
  HeroControls,
  HeroInner,
  HeroTitle,
} from "@/layouts/Headings/client/Heros";
import { SelectACategoryBtnGroup } from "@/components/inputs/SelectCategory";
import { HeroRenderDates } from "@/layouts/Headings/client/RenderDates";

// Utils
import { ComplieRenderData } from "@/utils/actions";
import { FixturaStack } from "@/components/containers/stack";
import { H } from "@/components/Type/Headers";
export async function HeroText({ params }) {
  const renderData = await getRenderFields(params.render, []);
  const Count = await RenderCount(params.render);
  //console.log(Count)
  return (
    <>
      <FixturaHero>
        <HeroInner>
          <HeroTitle>
            <AccountNameAndLogoStack params={params} />
          </HeroTitle>

          <HeroControls>
            {/* <SelectACategory params={params} />
          <PageCategoryHeader /> */}
            <FixturaStack>
              <SelectACategoryBtnGroup params={params} />
              <HeroRenderDates
                createdAt={ComplieRenderData(renderData.attributes)}
                Assets={Count.downloads + Count.gtp_3_reports}
              />
            </FixturaStack>
          </HeroControls>
        </HeroInner>
      </FixturaHero>
    </>
  );
}