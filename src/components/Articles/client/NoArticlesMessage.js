import { P } from "@/components/Type/Paragraph"
import { FixturaPaper } from "@/components/containers/paper"
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid"

export const NoArticlesMessage = ()=>{
    return(
        <FixturaGRIDOUTER>
        <FixturaGRIDCOL span={10}>
          <FixturaPaper c={2}>
            <P ta="center">
              We apologize, but it seems that the articles for this game are
              currently unavailable.
            </P>
          </FixturaPaper>
        </FixturaGRIDCOL>
      </FixturaGRIDOUTER>
    )
}