import { FixturaContainer } from "@/components/containers/containers";
import SectionVideos from "@/components/sections/server/SectionVideos";
import { PageTitleAndCreated } from "@/components/Type/Headers";
import SectionTop5 from "@/components/sections/server/SectionTop5";

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

      <SectionVideos
        params={params}
        Title={`Results Videos`}
        Type={`results`}
        Path={`game_results_in_renders`}
        GroupBy={decodeURIComponent(params.key)}
      />
      <SectionTop5
        params={params}
        Type={`statistics`}
        GroupBy={decodeURIComponent(params.key)}
        display={"VIDEO"}
      />
    </FixturaContainer>
  );
}
