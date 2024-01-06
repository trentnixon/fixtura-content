import { RendersTableof } from "@/components/PageAccount/client/RendersTableof";
import { FixturaComponent } from "@/components/containers/containers";
import { FixturaStack } from "@/components/containers/stack";
import { SectionHeaderWithSubHeader } from "@/layouts/Headings/SectionHeaderWithSubHeader";

export default async function DisplayAccountRenders(props) {
  const { OBJ } = props;
  return (
    <FixturaComponent>
      <FixturaStack align="left">
        <SectionHeaderWithSubHeader
          Main="Renders"
          Sub={`${OBJ.RENDERS.length} Available`}
        />
        <RendersTableof {...props} />
      </FixturaStack>
    </FixturaComponent>
  );
}
