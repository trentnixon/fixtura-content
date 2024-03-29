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
import { HeroRenderDates } from "@/layouts/Headings/client/RenderDates";

// Utils
import { ComplieRenderData } from "@/utils/actions";
import { FixturaStack } from "@/components/containers/stack";
import { getAccountFields } from "@/api/accounts";
import { MainCSSBanner } from "@/layouts/Headings/client/MainCSSBanner";
import { PageCategoryHeader } from "@/components/UI/Headers";

export async function HeroText({ params }) {
  const renderData = await getRenderFields(params.render, [
    "game_results_in_renders.game_meta_datum",
    "upcoming_games_in_renders.game_meta_datum",
  ]);
  const Count = await RenderCount(params.render);
  //console.log(renderData)

  const account = await getAccountFields(params.id, [
    "account_type",
    "clubs",
    "clubs.Logo",
    "associations",
    "associations.Logo",
  ]);

  return (
    <>
      <MainCSSBanner />
      <FixturaHero account={account}>
        <HeroInner>
          <HeroTitle>
            <AccountNameAndLogoStack params={params} />
          </HeroTitle>
          <HeroControls>
            <FixturaStack>
              <PageCategoryHeader />
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
/* <SelectACategory params={params} />*/
/* <SelectACategoryBtnGroup params={params} /> */
