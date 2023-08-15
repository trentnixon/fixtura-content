import { getAccountFields } from "@/api/accounts";
import { getWriteupsFromRender } from "@/api/getWriteup";
import { FixturaSection } from "@/components/containers/Section";
import SectionMatchWriteupsClient from "@/components/sections/client/SectionMatchWriteups";
import { FindAccountWriteupID } from "@/utils/actions";
export default async function SectionMatchWriteups({ params, Type, Path }) {
  const accountBasic = await getAccountFields(params.id, [
    "account_type",
    "clubs",
    "associations",
  ]); 
  const BiasID = FindAccountWriteupID(accountBasic);
  const Writeups = await getWriteupsFromRender(
    params.render,
    Path,
    Type,
    BiasID
  );

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
