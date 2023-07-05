// APIS
import { getAccountFields } from "@/api/accounts";
import { FixturaAccountLogo } from "@/components/Images/Fixturaimages";
import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import {
  FixturaAccountLogoBox,
  FixturaAccountBox,
} from "@/components/containers/boxes";
import { FixturaComponent } from "@/components/containers/containers";
import { FixturaPaper } from "@/components/containers/paper";
import { FindAccountLabel, FindAccountLogo } from "@/utils/actions";

export default async function AccountDetails({ params }) {
  const { id } = params;
  const accountBasic = await getAccountFields(id, [
    "account_type",
    "clubs",
    "clubs.Logo",
    "associations",
    "associations.Logo",
  ]);
  const TYPE = accountBasic.attributes.account_type.data.attributes.Name;
 
  console.log(accountBasic)
  return (
    <FixturaComponent>
      <FixturaPaper>
        <FixturaAccountBox>
          <H size="h5">Account Type: {TYPE}</H>
        </FixturaAccountBox>
        <FixturaAccountLogoBox>
          <FixturaAccountLogo
            Logo={FindAccountLogo(accountBasic)}
            AccountLabel={FindAccountLabel(accountBasic)}
          />
          <P>{FindAccountLabel(accountBasic)} </P>
        </FixturaAccountLogoBox>
      </FixturaPaper>
    </FixturaComponent>
  );
}
