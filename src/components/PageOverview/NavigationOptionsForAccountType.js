// APIS
import { getAccount } from "@/api/accounts";
import { RenderCount } from "@/api/renders";
import { CategoryCard } from "@/components/Cards/CategoryCard";
import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import { BUTTON_LINK } from "@/components/UI/buttons";
import { FixturaComponent } from "@/components/containers/containers";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { FixturaTable } from "@/layouts/Table/Table";
import { FindAccountType } from "@/utils/actions";
import { Icon123 } from "@tabler/icons-react";

export default async function NavigationOptionsForAccountType({ params }) {
  const { id, render } = params;
  const renders = await RenderCount(render);
  const accountBasic = await getAccount(id);

  return (
    <>
      <FixturaComponent>
        <FixturaTable horizontalSpacing="md" verticalSpacing="md" fontSize="md">
          <thead>
            <tr>
              <th>Grade /Team</th>
              <th>Results</th>
              <th>Upcoming</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(renders.assetGrouping).map((key, i) => (
              <tr key={i}>
                <td><P fw={600}>{key}</P></td>
                <td>
                  <BUTTON_LINK
                    href={`/${id}/${render}/${encodeURIComponent(key)}/r/v`}
                    Label="Results"
                    size={"xs"}
                    Color={'blue'}
                  />
                </td>
                <td>
                  <BUTTON_LINK
                    size={"xs"}
                    href={`/${id}/${render}/${encodeURIComponent(key)}/u/v`}
                    Label="Upcoming"
                    Color={'green'}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </FixturaTable>
      </FixturaComponent>
    </>
  );
}

//<CategoryPod params={params} keyLabel={key} />
/*
  <FixturaGRIDCOL
              key={i}
              span={Object.keys(renders.assetGrouping).length < 3 ? 6 : 4}
            >
              <CategoryPod params={params} keyLabel={key} />
            </FixturaGRIDCOL> 
*/

/* const CategoryPod = (props) => {
  const { params, keyLabel } = props;
  const { id, render } = params;
  return (
    <CategoryCard
      IMG={`https://fixtura.s3.ap-southeast-2.amazonaws.com/Score_Card_BG_f55e00c64d.png`}
      icon={<Icon123 />}
      Category={`${keyLabel} Assets`}
      color="teal"
      c="9"
      Link={`/${id}/${render}/${encodeURIComponent(keyLabel)}/`}
    />
  );
};
 */