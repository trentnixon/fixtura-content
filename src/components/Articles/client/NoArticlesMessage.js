import { P } from "@/components/Type/Paragraph";
import { FixturaPaper } from "@/components/containers/paper";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";

export const NoArticlesMessage = () => {
  return (
    <FixturaGRIDOUTER>
      <FixturaGRIDCOL span={10}>
        <P fw={900} fz={'lg'} my={10} ta="center">Message from the press box!</P>
        <FixturaPaper c={2}>
          <P ta="center">
            The Article for this Game is Being Crafted and will be Published
            Shortly.
          </P>
        </FixturaPaper>
      </FixturaGRIDCOL>
    </FixturaGRIDOUTER>
  );
};
