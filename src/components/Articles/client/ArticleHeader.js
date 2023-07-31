import { H } from "@/components/Type/Headers"
import { P } from "@/components/Type/Paragraph"
import { FixturaGroup } from "@/components/containers/Group"
import { FixturaAccountBox, FixturaArticleBox } from "@/components/containers/boxes"

export const ArticleHeader = ({GAME})=>{
    return(
        <FixturaAccountBox c={0} my={20} py={10}>
            <FixturaGroup my={5}>
              <P>
                {GAME.type} {GAME.round}
              </P>

              <P>{GAME.date}</P>
            </FixturaGroup>
            <FixturaGroup>
              <div>
                <H size={`h3`} align="right">{`${GAME.teamHome}`}</H>
                <H size={`h6`} align="right" color="gray.6" weight="400">{`${
                  GAME?.Homescores === null ? "" : GAME?.Homescores
                } ${GAME?.HomeOvers === null ? "" : GAME?.HomeOvers}`}</H>
              </div>

              <div>vs</div>
              <div>
                <H size={`h3`}>{`${GAME.teamAway}`}</H>
                <H size={`h6`} color="gray.6" weight="400">{`${
                  GAME?.Awayscores === null ? "" : GAME?.Awayscores
                } ${GAME?.AwayOvers === null ? "" : GAME?.AwayOvers}`}</H>
              </div>
            </FixturaGroup>

            {!GAME.ResultStatement ? (
              false
            ) : (
              <FixturaArticleBox c={1}>
                <P ta="center">{GAME.ResultStatement}</P>
              </FixturaArticleBox>
            )}
          </FixturaAccountBox>
    )
}