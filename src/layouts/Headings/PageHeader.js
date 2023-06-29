// APIS
import { RenderCount, getRenderFields } from "@/api/renders";
import { PageCategoryHeader } from "@/components/UI/Headers";
import { FixturaGroup } from "@/components/containers/Group";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaContainer } from "@/components/containers/containers";
import { SelectACategory } from "@/components/inputs/SelectCategory";
import { RenderDates } from "@/layouts/Headings/client/RenderDates";
// Utils
import { ComplieRenderData } from "@/utils/actions";
export const FixturaPageHeader = async (props) => {
  const { params } = props;
  const renderData = await getRenderFields(params.render, []);
  const Count = await RenderCount(params.render);

  if (params.render === undefined) return false;
  return (
    <FixturaContainer>
      <FixturaGroup>
         
        <RenderDates
          createdAt={ComplieRenderData(renderData.attributes)}
          Assets={Count.downloads + Count.gtp_3_reports}
        />
        <FixturaBox>
          <FixturaGroup position={"left"}>
            <PageCategoryHeader />
            <SelectACategory params={params} />
          </FixturaGroup>
        </FixturaBox>
      </FixturaGroup>
    </FixturaContainer>
  );
};
