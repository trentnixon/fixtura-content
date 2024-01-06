import { FixturaContainer } from "@/components/containers/containers";
import SectionVideos from "@/components/sections/server/SectionVideos";
import { PageTitleAndCreated } from "@/components/Type/Headers";
import { getRenders } from "@/api/renders";

export default async function Upage({ params }) {
  const Render = await getRenders(params.render);
  return (
    <FixturaContainer>
      <PageTitleAndCreated
        createdAt={Render.attributes.createdAt}
        Title={decodeURIComponent(params.key)}
        brackets={"Upcoming Games"}
      />

      <SectionVideos
        params={params}
        Title={`Upcoming Fixture Videos`}
        Type={`upcoming`}
        Path={`upcoming_games_in_renders`}
        GroupBy={decodeURIComponent(params.key)}
      />
    </FixturaContainer>
  );
}
