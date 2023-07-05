// APIS
import { getAccountFields } from "@/api/accounts";
import { FindAccountLabel, FindAccountLogo } from "@/utils/actions";
// Components
import { H } from "@/components/Type/Headers";
import { FixturaGroup } from "@/components/containers/Group";
import { FixturaHeaderLogo } from "@/components/Images/Fixturaimages";
import { FixturaStack } from "@/components/containers/stack";

// Utils

export async function AccountNameAndLogo({ params }) {
  const { id } = params;

  const account = await getAccountFields(id, [
    "account_type",
    "clubs",
    "clubs.Logo",
    "associations",
    "associations.Logo",
  ]);

  const Logo = await FindAccountLogo(account);
  const heading = await FindAccountLabel(account);

  return (
    <FixturaGroup>
      <H size="h5">{heading}</H>
      {Logo === null ? false : <FixturaHeaderLogo Logo={Logo} />}
    </FixturaGroup>
  );
}

export async function AccountNameAndLogoStack({ params }) {
  const { id } = params;

  const account = await getAccountFields(id, [
    "account_type",
    "clubs",
    "clubs.Logo",
    "associations",
    "associations.Logo",
  ]);

  const Logo = await FindAccountLogo(account);
  const heading = await FindAccountLabel(account);

  return (
    <FixturaStack>
      {Logo === null ? (
        false
      ) : (
        <FixturaHeaderLogo Logo={Logo} width={100} height={100} />
      )}
      <H size="h5">{heading}</H>
    </FixturaStack>
  );
}
