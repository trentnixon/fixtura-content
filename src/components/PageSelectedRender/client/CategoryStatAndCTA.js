import { H } from "@/components/Type/Headers";
import { BUTTON_LINK } from "@/components/UI/buttons";
import { FixturaGroup } from "@/components/containers/Group";
import { FixturaCategoryBox } from "@/components/containers/boxes";
import { FixturaPaper } from "@/components/containers/paper";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";

export const CategoryStatAndCTA = (props) => {
  const { OBJ, Category, color, c, Link, icon } = props;

  return (
    <FixturaCategoryBox color={color} c={c}>
      <FixturaGRIDOUTER>
        <FixturaGRIDCOL span={1}>{icon}</FixturaGRIDCOL>
        {OBJ.map((col, i) => {
          return (
            <GridItem
              title={col.title}
              value={col.value}
              icon={col.icon}
              key={i}
            />
          );
        })}

        <GridItemCTA Link={Link} />
      </FixturaGRIDOUTER>
    </FixturaCategoryBox>
  );
};

const GridItem = ({ title, value }) => {
  return (
    <FixturaGRIDCOL span={3}>
      <FixturaPaper>
        <FixturaGroup>
          <H size="h4">{title}</H>
          <H size="h6">{value}</H>
        </FixturaGroup>
      </FixturaPaper>
    </FixturaGRIDCOL>
  );
};
const GridItemCTA = ({ Link }) => {
  return (
    <FixturaGRIDCOL span={2}>
      <BUTTON_LINK Label="Review" href={Link} />
    </FixturaGRIDCOL>
  );
};