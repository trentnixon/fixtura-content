import { FixturaContainer } from "@/components/containers/containers";
import SectionImages from "@/components/sections/server/SectionImages";
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
      <SectionImages
        params={params}
        Title={`Upcoming Images`}
        Type={`results`}
        GroupBy={decodeURIComponent(params.key)}
      />
      <SectionTop5
        params={params}
        Type={`statistics`}
        GroupBy={decodeURIComponent(params.key)}
        display={"IMAGE"}
      />
    </FixturaContainer>
  );
}
