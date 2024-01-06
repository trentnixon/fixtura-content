import {
  FixturaComponent,
  FixturaContainer,
} from "@/components/containers/containers";
import { H, PageTitleAndCreated } from "@/components/Type/Headers";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { CategoryCard } from "@/components/Cards/CategoryCard";
import { getRenders } from "@/api/renders";

export default async function Results({ params }) {
  const { id, render, key } = params;
  console.log("Page.js - Upage");
  const Render = await getRenders(render);
  return (
    <>
      <FixturaContainer>
        <PageTitleAndCreated
          createdAt={Render.attributes.createdAt}
          Title={decodeURIComponent(params.key)}
          brackets={"Results"}
        />
      </FixturaContainer>
      results
      {/* <FixturaComponent>
          <FixturaGRIDOUTER>
            <FixturaGRIDCOL span={4}>
              <CategoryCard
                IMG={`https://fixtura.s3.ap-southeast-2.amazonaws.com/Score_Card_BG_f55e00c64d.png`}
                icon={<Icon123 />}
                Category={`Review Videos`}
                color="teal"
                c="9"
                Link={`/${id}/${render}/${key}/r/v`}
              />
            </FixturaGRIDCOL>
  
            <FixturaGRIDCOL span={4}>
              <CategoryCard
                IMG={`https://fixtura.s3.ap-southeast-2.amazonaws.com/Score_Card_BG_f55e00c64d.png`}
                icon={<Icon123 />}
                Category={`Review Images`}
                color="teal"
                c="9"
                Link={`/${id}/${render}/${key}/r/i`}
              />
            </FixturaGRIDCOL>
  
            <FixturaGRIDCOL span={4}>
              <CategoryCard
                IMG={`https://fixtura.s3.ap-southeast-2.amazonaws.com/Score_Card_BG_f55e00c64d.png`}
                icon={<Icon123 />}
                Category={`Review Writeups`}
                color="teal"
                c="9"
                Link={`/${id}/${render}/${key}/r/w`}
              />
            </FixturaGRIDCOL>
          </FixturaGRIDOUTER>
        </FixturaComponent> */}
    </>
  );
}
