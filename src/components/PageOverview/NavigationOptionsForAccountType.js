// APIS
import { getAccount } from "@/api/accounts";
import { RenderCount } from "@/api/renders";

import { P } from "@/components/Type/Paragraph";
import { BUTTON_LINK } from "@/components/UI/buttons";
import { FixturaComponent } from "@/components/containers/containers";
import { FixturaPaper } from "@/components/containers/paper";
import { FixturaAvatar } from "@/layouts/Images/FixturaImages";
import { FixturaTable } from "@/layouts/Table/Table";
import { FindAccountLogo } from "@/utils/actions";

export default async function NavigationOptionsForAccountType({ params }) {
  const { id, render } = params;
  const renders = await RenderCount(render);
  const accountBasic = await getAccount(id);
  console.log("accountBasic", FindAccountLogo(accountBasic)) 
  
  return (
    <>
      <FixturaComponent>
        <FixturaPaper>
          <FixturaTable horizontalSpacing="md" verticalSpacing="md">
            <thead>
              <tr>
                <th></th>
                <th>Grade /Team</th>
                <th>Results</th>
                <th>Upcoming</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(renders.assetGrouping).map((key, i) => (
                <tr key={i}>
                  <td><FixturaAvatar IMG={FindAccountLogo(accountBasic)}/></td>
                  <td>
                    
                    <P fs={"sm"} fw={600}>
                      {key}
                    </P>
                  </td>
                  <td>
                    <BUTTON_LINK
                      href={`/${id}/${render}/${encodeURIComponent(key)}/r/v`}
                      Label="Results"
                      size={"xs"}
                      Color={"blue"}
                    />
                  </td>
                  <td>
                    <BUTTON_LINK
                      size={"xs"}
                      href={`/${id}/${render}/${encodeURIComponent(key)}/u/v`}
                      Label="Upcoming"
                      Color={"green"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </FixturaTable>
        </FixturaPaper>
      </FixturaComponent>
    </>
  );
}