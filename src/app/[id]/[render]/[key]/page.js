import { getRenders } from "@/api/renders";
import { KeyNavigationItems } from "@/components/PageSelectedRender/client/Navigation";
import { H, PageTitleAndCreated } from "@/components/Type/Headers";
import { FixturaSection } from "@/components/containers/Section";
import { FixturaContainer } from "@/components/containers/containers";

export default async function page({ params }) {
  const { render, id, key } = params;
  const Render = await getRenders(render);
  return (
    <FixturaContainer>
      <PageTitleAndCreated
        createdAt={Render.attributes.createdAt}
        Title={decodeURIComponent(params.key)}
        brackets={"Results"}
      /> 
      <FixturaSection
        shade={0}
        Title={`Results or Upcoming fixtures?`}
        subTitle={``}
        Icon={`ICO_RES_CALENDAR`}
      >
        <KeyNavigationItems params={params} Render={Render} />
      </FixturaSection>
    </FixturaContainer> 
  );  
}
