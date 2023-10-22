// APIS
import { getAccount } from "@/api/accounts";
import { RenderCount } from "@/api/renders";
import { CategoryCard } from "@/components/Cards/CategoryCard";
import { H } from "@/components/Type/Headers";
import { FixturaComponent } from "@/components/containers/containers";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { FindAccountType } from "@/utils/actions";
import { Icon123 } from "@tabler/icons-react";

export default async function NavigationOptionsForAccountType({ params }) {
  const { id, render } = params;
  const renders = await RenderCount(render);
  const accountBasic = await getAccount(id);

  return (
    <>
      <FixturaComponent>
        <FixturaGRIDOUTER>
          {Object.keys(renders.assetGrouping).map((key, i) => (
            <FixturaGRIDCOL
              key={i}
              span={Object.keys(renders.assetGrouping).length < 3 ? 6 : 4}
            >
              <CategoryPod params={params} keyLabel={key} />
            </FixturaGRIDCOL>
          ))}
        </FixturaGRIDOUTER>
      </FixturaComponent>
    </>
  );
}

const CategoryPod = (props) => {
  const { params, keyLabel } = props;
  const { id, render } = params;
  return (
    <CategoryCard
      IMG={`https://fixtura.s3.ap-southeast-2.amazonaws.com/Score_Card_BG_f55e00c64d.png`}
      icon={<Icon123 />}
      Category={`${keyLabel} Assets`}
      color="teal"
      c="9"
      Link={`/${id}/${render}/${keyLabel}/`}
    />
  );
};
