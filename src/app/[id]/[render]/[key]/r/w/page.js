import { FixturaContainer } from "@/components/containers/containers";
import SectionMatchWriteups from "@/components/sections/server/SectionMatchWriteups";
import { PageTitleAndCreated } from "@/components/Type/Headers";
import { getRenders } from "@/api/renders";

export default async function Upage({ params }) {
  console.log("Page.js - Upage");
  const Render = await getRenders(params.render);

  return (
    <FixturaContainer>
      <PageTitleAndCreated
        createdAt={Render.attributes.createdAt}
        Title={decodeURIComponent(params.key)}
        brackets={"Results"}
      />
      <SectionMatchWriteups
        params={params}
        Title={`Result Writeups`}
        Type={`results`}
        Path={`game_results_in_renders`}
        GroupBy={decodeURIComponent(params.key)}
      /> 
    </FixturaContainer>
  );
}
