import { getAccountFields } from "@/api/accounts";
import { getWriteupsFromRender } from "@/api/getWriteup";
import { FixturaSection } from "@/components/containers/Section";
import SectionMatchWriteupsClient from "@/components/sections/client/SectionMatchWriteups";
import { FindAccountType, FindAccountWriteupID, isSponsorsActive } from "@/utils/actions";
export default async function SectionMatchWriteups(props) {
  const { params, Type, Path, GroupBy,Title } = props;
  const accountBasic = await getAccountFields(params.id, [
    "account_type",
    "clubs",
    "associations",
    "sponsors",
    "subscription_tier",
  ]);
  const BiasID = FindAccountWriteupID(accountBasic);
  const Writeups = await getWriteupsFromRender(
    params.render,
    Path,
    Type,
    BiasID
  );

  //console.log("isSponsorsActive ",isSponsorsActive(accountBasic));
    //console.log("Writeups", Writeups)
  return (
    <FixturaSection
      shade={0}
      Title={Title}
      subTitle={`Stay Informed with Our Weekend Articles`}
      Icon={`ICO_HEADER_ARTICLE`}
    >
      <SectionMatchWriteupsClient
        renderData={Writeups}
        hasSponsors={isSponsorsActive(accountBasic)} 
        GroupBy={GroupBy}
        FindAccountType={FindAccountType(accountBasic)}
      />
    </FixturaSection>
  );
}
