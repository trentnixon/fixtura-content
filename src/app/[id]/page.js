// APIS
// Structure
import { FixturaSection } from "@/components/containers/Section";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
// Components
import { getAccountFields } from "@/api/accounts";
import { BUTTON_LINK } from "@/components/UI/buttons";

export const metadata = {
  title: "Your Your Account | Fixtura Content Hub",
  description:
    "Explore High-Quality Match Reports, Videos, and Images Across Various Sports",
};

export default async function Account({ params }) {
  // Define page-specific metadata
  const accountBasic = await getAccountFields(params.id, []);
  return (
    <> 
      <FixturaSection
        shade={0}
        Title={"Bundle Hub"}
        subTitle={""} 
        Icon={`ICO_HEADER_ACCOUNT`}
      >
        <FixturaGRIDOUTER>
          <FixturaGRIDCOL span={12}>
            <BUTTON_LINK
              Label={`View Your ${accountBasic.attributes.Sport} Bundles`}
              href={`/${
                params.id
              }/${accountBasic.attributes.Sport.toLowerCase()}`}
            />
          </FixturaGRIDCOL>
        </FixturaGRIDOUTER>
      </FixturaSection>
    </>
  );
}
