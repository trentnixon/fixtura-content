import { FixturaContainer } from "@/components/containers/containers";
import SectionImages from "@/components/sections/server/SectionImages";
import { PageTitleAndCreated } from "@/components/Type/Headers";
import { getRenders } from "@/api/renders";
import { RequestTeamRosterForRender } from "@/components/Images/client/createTeamRoster";

export default async function Upage({ params }) {
  const Render = await getRenders(params.render);
  return (
    <FixturaContainer>
      <PageTitleAndCreated
        createdAt={Render.attributes.createdAt}
        Title={decodeURIComponent(params.key)}
        brackets={"Upcoming Games"}
      />

      <SectionImages
        params={params}
        Title={`Upcoming Fixture Images`}
        Type={`upcoming`}
        GroupBy={decodeURIComponent(params.key)}
      />

      <RequestTeamRosterForRender Render={Render} />
    </FixturaContainer>
  );
}
