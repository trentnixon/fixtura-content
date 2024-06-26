'use client';
// APIS
import { FixturaContainer } from "@/components/containers/containers";
import { H } from "@/components/Type/Headers";
import { AccountSettings } from "@/context/ContextAccountSettings";
import { useContext } from "react";

export function SelectedStatsStatement() {
  const AccountContext = useContext(AccountSettings);
  const { stats } = AccountContext;
  const { Count } = stats;
  return (
    <FixturaContainer my={5} mx={"2%"}>
      <H size={"h3"} align="right" weight={400}>
        This weeks bundle covers <Bold>{Count?.GameCount?.Total}</Bold> Games.
      </H>
      <H size={"h3"} align="right" weight={400}>
        Covering <Bold>{Count?.GameCount.Results}</Bold> Match results and{" "}
        <Bold>{Count?.GameCount.Upcoming}</Bold> Upcoming fixtures.
      </H>
      <H size={"h3"} align="right" weight={400}>
        A total of <Bold>{Count?.downloads + Count?.aiReports}</Bold> assets
        were created this week.
      </H>
    </FixturaContainer>
  );
}

const Bold = (props) => {
  return (
    <span style={{ fontWeight: 900, fontSize: "40px" }}>{props.children}</span>
  );
};
