"use client";
import { CategoryCard } from "@/components/Cards/CategoryCard";
import { FixturaComponent } from "@/components/containers/containers";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { Icon123 } from "@tabler/icons-react";

export const KeyNavigationItems = (props) => {
  const { id, render, key } = props.params;
  return (
    <FixturaComponent>
      <FixturaGRIDOUTER>
        <FixturaGRIDCOL span={6}>
          <CategoryCard
            IMG={`https://fixtura.s3.ap-southeast-2.amazonaws.com/Score_Card_BG_f55e00c64d.png`}
            OBJ={[]}
            icon={<Icon123 />}
            Category={`Review ${decodeURIComponent(key)} Results`}
            color="teal"
            c="9"
            Link={`/${id}/${render}/${key}/r/v`}
          />
        </FixturaGRIDCOL>
        <FixturaGRIDCOL span={6}>
          <CategoryCard
            IMG={`https://fixtura.s3.ap-southeast-2.amazonaws.com/Score_Card_BG_f55e00c64d.png`}
            OBJ={[]}
            icon={<Icon123 />}
            Category={`Review ${decodeURIComponent(key)} Upcoming`}
            color="teal"
            c="9"
            Link={`/${id}/${render}/${key}/u/v`}
          />
        </FixturaGRIDCOL>
      </FixturaGRIDOUTER>
    </FixturaComponent>
  );
};
