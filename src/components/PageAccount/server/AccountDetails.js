// APIS

import { FixturaAccountLogo } from "@/components/Images/Fixturaimages";
import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import {
  FixturaAccountLogoBox,
  FixturaAccountBox,
} from "@/components/containers/boxes";
import { FixturaComponent } from "@/components/containers/containers";
import { FixturaPaper } from "@/components/containers/paper";

export default async function AccountDetails({ OBJ }) {
  return (
    <FixturaComponent>
      <FixturaPaper>
        <FixturaAccountBox>
          <H size="h5" align={"center"}>
            Account Type: {OBJ.TYPE}
          </H>
        </FixturaAccountBox>
        <FixturaAccountLogoBox>
          <FixturaAccountLogo Logo={OBJ.Logo} AccountLabel={OBJ.AccountLabel} />
          <P ta={"center"}>{OBJ.AccountLabel} </P>
        </FixturaAccountLogoBox>
      </FixturaPaper>
    </FixturaComponent>
  );
}
