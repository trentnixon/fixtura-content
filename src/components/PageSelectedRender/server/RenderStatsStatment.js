// APIS
import { FixturaContainer } from "@/components/containers/containers";
import { H } from "@/components/Type/Headers";

export async function SelectedStatsStatment({ Count }) {
  //console.log(Count);

  return (
    <FixturaContainer my={50} mx={'15%'}>
      <H size={"h3"} align="center" weight={400}>
        This weeks package covers <Bold>{Count?.GameCount?.Total}</Bold> Games,
        covering <Bold>{Count?.GameCount.Upcoming}</Bold> Upcoming Games and
        Match results for <Bold>{Count?.GameCount.Results}</Bold> fixtures. In
        total <Bold>{Count?.downloads + Count?.gtp_3_reports}</Bold> assets were
        created this week.
      </H>
    </FixturaContainer>
  );
}

const Bold = (props) => {
  return (
    <span style={{ fontWeight: 900, fontSize: "50px" }}>{props.children}</span>
  );
};
