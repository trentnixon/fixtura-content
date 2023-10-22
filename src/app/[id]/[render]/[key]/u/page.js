import {
  FixturaComponent,
  FixturaContainer,
} from "@/components/containers/containers";
import { PageTitleAndCreated } from "@/components/Type/Headers";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { CategoryCard } from "@/components/Cards/CategoryCard";
import { Icon123 } from "@tabler/icons-react";
import { getRenders } from "@/api/renders";

export default async function Upage({ params }) {
  const { id, render, key } = params;
  const Render = await getRenders(params.render);
  return (
    <>
      <FixturaContainer>
        <PageTitleAndCreated
          createdAt={Render.attributes.createdAt}
          Title={decodeURIComponent(params.key)}
          brackets={"Upcoming Games"}
        />
      </FixturaContainer>

      <FixturaComponent>
        <FixturaGRIDOUTER>
          <FixturaGRIDCOL span={4}>
            <CategoryCard
              IMG={`https://fixtura.s3.ap-southeast-2.amazonaws.com/Score_Card_BG_f55e00c64d.png`}
              OBJ={[]}
              icon={<Icon123 />}
              Category={`Review Videos`}
              color="teal"
              c="9"
              Link={`/${id}/${render}/${key}/u/v`}
            />
          </FixturaGRIDCOL>

          <FixturaGRIDCOL span={4}>
            <CategoryCard
              IMG={`https://fixtura.s3.ap-southeast-2.amazonaws.com/Score_Card_BG_f55e00c64d.png`}
              OBJ={[]}
              icon={<Icon123 />}
              Category={`Review Images`}
              color="teal"
              c="9"
              Link={`/${id}/${render}/${key}/u/i`}
            />
          </FixturaGRIDCOL>

          <FixturaGRIDCOL span={4}>
            <CategoryCard
              IMG={`https://fixtura.s3.ap-southeast-2.amazonaws.com/Score_Card_BG_f55e00c64d.png`}
              OBJ={[]}
              icon={<Icon123 />}
              Category={`Review Writeups`}
              color="teal"
              c="9"
              Link={`/${id}/${render}/${key}/u/w`}
            />
          </FixturaGRIDCOL>
        </FixturaGRIDOUTER>
      </FixturaComponent>
    </>
  );
}
