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
        Title={`Simplified Layout:`}
        Copy={`We've decluttered and focused on what's essential. Results and
        upcoming events take center stage, while videos, images, and write-ups
        have dedicated pages for easier access. More tweaks are coming soon!
`}
      />

      <DeveloperComment
        Title={`Asset Categories:`}
        Copy={`Assets are now sorted based on your organization type - by competition
          for associations and by age group for clubs. This means more targeted
          and relevant content for you and your audience.`}
      />
    </FixturaContainer>
  );
}

const Bold = (props) => {
  return (
    <span style={{ fontWeight: 900, fontSize: "50px" }}>{props.children}</span>
  );
};
