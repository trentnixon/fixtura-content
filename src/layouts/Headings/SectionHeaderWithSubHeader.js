import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import { FixturaGroup } from "@/components/containers/Group";

export const SectionHeaderWithSubHeader = ({Main,Sub}) => {
  return (
    <FixturaGroup position="apart">
      <H size="h5" align="left">
       {Main}
      </H>
      <P fz={'xs'}>{Sub}</P>
    </FixturaGroup> 
  );
};
