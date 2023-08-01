import { getWriteupsFromRender } from "@/api/getWriteup";
import { FixturaSection } from "@/components/containers/Section";
import SectionMatchWriteupsClient from "@/components/sections/client/SectionMatchWriteups";
export default async function SectionMatchWriteups({ params, Type, Path }) {
  const Writeups = await getWriteupsFromRender(params.render, Path, Type);
  return ( 
    <FixturaSection
      shade={0}
      Title={`Articles`}
      subTitle={`Stay Informed with Our Weekend Articles`}
      Icon={`ICO_HEADER_ARTICLE`}
    >
      <SectionMatchWriteupsClient renderData={Writeups} />
    </FixturaSection>
  );
}
