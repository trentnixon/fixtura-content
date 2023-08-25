import { getAccountFields } from "@/api/accounts";
import { getWriteupsFromRender } from "@/api/getWriteup";
import { FixturaSection } from "@/components/containers/Section";
import SectionMatchWriteupsClient from "@/components/sections/client/SectionMatchWriteups";
import { FindAccountWriteupID, isSponsorsActive } from "@/utils/actions";
export default async function SectionMatchWriteups({ params, Type, Path }) {
  const accountBasic = await getAccountFields(params.id, [
    "account_type",
    "clubs",
    "associations",
    "sponsors",
    "subscription_tier"
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
      <SectionMatchWriteupsClient renderData={Writeups} hasSponsors={isSponsorsActive(accountBasic)} />
    </FixturaSection>
  );
}
