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

const updatesData = [
  {
    Title: "Grade Ordering Improvement",
    Copy: "We've revamped our grade ordering feature, enhancing its sophistication to effectively tackle 90% of the naming discrepancies observed in association grade names. Should you encounter any discrepancies in video ordering, your feedback is invaluable. Please reach out to us for further refinements"
  },
  {
    Title: "Sponsors Logo Update",
    Copy: "We've streamlined the visual appeal of our videos by removing sponsor names from logo placements, ensuring a cleaner and more focused presentation of your brand."
  },
  {
    Title: "New Template Release",
    Copy: "Innovation never stops at Fixtura! We're thrilled to announce the imminent release of our latest template, inspired by the dynamic style of the CNSW social media account. This versatile template, available next week, offers three options: sleek blank colors, personalized images, or a stylish gradient effect. Initial tests promise a visually stunning addition to your creative toolkit."
  },
  /* {
    Title: "Introducing Team Rosters for Club Accounts",
    Copy: "Fixtura has rolled out a fantastic new feature - the ability to create on-demand team rosters. Once your player rosters are uploaded into PlayHQ, simply head over to Fixtura and hit the 'Generate Roster' button. This lets Fixtura fetch your roster and craft those slick graphics for you. A heads-up though - this option is available only on Thursdays and Fridays, and you can use it just once per bundle. So, make sure your rosters are all set before you generate those assets. Get ready to showcase your teams like never before!"
  },
  {
    Title: "Incomplete Scorecards? No Problem!",
    Copy: "Due to several games in NSW not being live-scored, we've decided to remove the restrictions on complete scorecards in the results assets. This means more of your games will now be featured in your videos and graphics. Please note that while this ensures broader coverage, some games might have incomplete or missing scorecards. We believe this change will help you keep your fans updated more consistently, even when the full details aren't available."
  } */
];

export async function BundleUpdates() {
  return (
    <FixturaContainer my={30} mx={"0%"}>
      {updatesData.map((update, index) => (
        <DeveloperComment
          key={index}
          Title={update.Title}
          Copy={update.Copy}
        />
      ))}
    </FixturaContainer>
  );
}


const Bold = (props) => {
  return (
    <span style={{ fontWeight: 900, fontSize: "50px" }}>{props.children}</span>
  );
};
