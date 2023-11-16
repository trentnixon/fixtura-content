// APIS
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaContainer } from "@/components/containers/containers";
import { DeveloperComment } from "@/components/PageSelectedRender/client/DeveloperComment";
import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import { ICO_INFO } from "@/components/UI/Icons";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";

export async function BundleWelcomeMessage() {
  return (
    <FixturaBox c={8} baseColor={"green"}>
      <FixturaGRIDOUTER>
        <FixturaGRIDCOL span={11}>
          <H size={"h3"} align="left" weight={400} color={"gray.1"}>
            NEW Refreshed Bundle Hub!
          </H>
          <P c={"gray.1"}>
            We&apos;re excited to roll out some impactful updates to elevate
            your experience. As we continually strive to improve, we welcome any
            feedback on the new approach. Additionally, please notify us if you
            encounter any errors or find any missing fixtures in your weekly
            bundles.
          </P>
        </FixturaGRIDCOL>
        <FixturaGRIDCOL span={1}>
          <ICO_INFO />
        </FixturaGRIDCOL>
      </FixturaGRIDOUTER>
    </FixturaBox>
  );
}

export async function BundleUpdates() {
  return (
    <FixturaContainer my={30} mx={"0%"}>
      <DeveloperComment
        Title={`Introducing Team Rosters for Club Accounts`}
        Copy={`Big news for all cricket clubs! Fixtura has rolled out a fantastic new feature - the ability to create on-demand team rosters. Once your player rosters are uploaded into PlayHQ, simply head over to Fixtura and hit the 'Generate Roster' button. This lets Fixtura fetch your roster and craft those slick graphics for you. A heads-up though - this option is available only on Thursdays and Fridays, and you can use it just once per bundle. So, make sure your rosters are all set before you generate those assets. Get ready to showcase your teams like never before!
`}
      />

      <DeveloperComment
        Title={` Incomplete Scorecards? No Problem! `}
        Copy={`We've heard your feedback and made a significant update. Due to several games in NSW not being live-scored, we've decided to remove the restrictions on complete scorecards in the results assets. This means more of your games will now be featured in your videos and graphics. Please note that while this ensures broader coverage, some games might have incomplete or missing scorecards. We believe this change will help you keep your fans updated more consistently, even when the full details aren't available.`}
      />
    </FixturaContainer>
  );
}

const Bold = (props) => {
  return (
    <span style={{ fontWeight: 900, fontSize: "50px" }}>{props.children}</span>
  );
};
