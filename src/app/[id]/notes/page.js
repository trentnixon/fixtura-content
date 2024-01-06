import { BundleUpdates } from "@/components/PageSelectedRender/server/BundleWelcomeMessage";
import { FixturaSection } from "@/components/containers/Section";

export default function DeveloperNotes({ params }) {
  const { id } = params;
  return (
    <FixturaSection
      shade={0}
      Title={`Fixtura Updates`}
      subTitle={``}
      Icon={`ICO_Edit`}
    >
      <BundleUpdates id={id} />
    </FixturaSection>
  );
}
