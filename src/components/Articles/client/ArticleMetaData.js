import { S } from "@/components/Type/Paragraph"
import { FixturaGroup } from "@/components/containers/Group"
import { FixturaPaper } from "@/components/containers/paper"
import { formatStrapiCreatedOnDate } from "@/utils/actions"
import Link from "next/link"

export const ArticleMetaData = ({GAME})=>{
    return(
        <FixturaPaper my={15}>
            <FixturaGroup>
              <S ta={"left"} fw={400}>
                Article created on : {formatStrapiCreatedOnDate(GAME.createdAt)}
              </S>

              <S ta={"right"} fw={600} fs={"italic"}>
                Article sources :
                <Link
                  target="_blank"
                  href={`https://www.playhq.com${GAME.urlToScoreCard}`}
                >
                  Scorecard
                </Link>
              </S>
            </FixturaGroup>
          </FixturaPaper>
    )
}