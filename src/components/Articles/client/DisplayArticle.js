"use client";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import {
  IconCircleCheck,
  IconCopy,
  IconEdit,
  IconPlus,
  IconRefresh,
} from "@tabler/icons-react";
import { Container, Group, List, ThemeIcon, rem, Space } from "@mantine/core";
import Link from "next/link";
import {
  FixturaBox,
  FixturaArticleBox,
  FixturaAccountBox,
} from "@/components/containers/boxes";
import { FixturaPaper } from "@/components/containers/paper";
import { H } from "@/components/Type/Headers";
import { P, S } from "@/components/Type/Paragraph";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Button } from "@mantine/core";
import { FixturaGRIDCOL, FixturaGRIDOUTER } from "@/layouts/Grids/grid";
import { formatStrapiCreatedOnDate } from "@/utils/actions";
import { FixturaGroup } from "@/components/containers/Group";

export const DisplayArticleSet = ({ SelectedGame }) => {
  const [version, setVersion] = useState(0);
  const [copied, setCopied] = useState(false);
  //const GAME = ArticleSet[version].game_meta_datum;
  const GAME = SelectedGame[0].game_meta_datum;
  const ArticleSet = GAME.gtp_3_reports;
  console.log(GAME)
  console.log(ArticleSet[version]);
  return (
    <>
      <FixturaGRIDOUTER>
        <FixturaGRIDCOL span={10}>
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
          <FixturaPaper c={2}>
            <ReactMarkdown className="markdown">
              {ArticleSet[version].article}
            </ReactMarkdown>
          </FixturaPaper>
          <ActionBtns
            setCopied={setCopied}
            copied={copied}
            article={ArticleSet[version].article}
          />

          <FixturaGroup>
            <FixturaBox>
              <S ta={"left"} fw={600}>
                Article created on : {formatStrapiCreatedOnDate(GAME.createdAt)}
              </S>
            </FixturaBox>
            <FixturaBox>
              <S ta={"right"} fw={600}>
                Article sources :
                <Link
                  target="_blank"
                  href={`https://www.playhq.com${GAME.urlToScoreCard}`}
                >
                  {" "}
                  Scorecard
                </Link>
              </S>
            </FixturaBox>
          </FixturaGroup>
        </FixturaGRIDCOL>
        <FixturaGRIDCOL span={2}>
          <VersionGroup
            setVersion={setVersion}
            version={version}
            ArticleSet={ArticleSet}
          />
        </FixturaGRIDCOL>
      </FixturaGRIDOUTER>
    </>
  );
};

function VersionGroup({ setVersion, version, ArticleSet }) {
  return (
    <>
      <Space h={80} />
      <Button.Group orientation="vertical">
        {ArticleSet.map((type, i) => {
          console.log(type.asset.ArticleFormats);
          return (
            <Button
              key={i}
              variant="default"
              styles={(theme) => ({
                root: {
                  backgroundColor:
                    version === i
                      ? `${theme.colors.gray[7]} !important`
                      : `transparent`,
                  color:
                    version === i
                      ? `${theme.colors.gray[2]} `
                      : `${theme.colors.gray[6]}`,
                  height: rem(42),
                  paddingLeft: rem(20),
                  paddingRight: rem(20),
                  "&:hover": {
                    backgroundColor: theme.colors.gray[9],
                    color: theme.colors.gray[3],
                  },
                  leftIcon: {
                    marginRight: theme.spacing.md,
                  },
                  // Apply a different background color if this category is the selected one
                },
              })}
              onClick={() => {
                setVersion(i);
              }}
            >
              {type.asset.ArticleFormats}
            </Button>
          );
        })}
      </Button.Group>
    </>
  );
}

const ActionBtns = ({ setCopied, copied, article }) => {
  return (
    <Container className=" p-1 my-2">
      <Group position="center">
        <button className="btn btn-outline btn-info mx-1">
          <IconEdit />
          Edit
        </button>
        <button className="btn btn-outline btn-info mx-1">
          <IconRefresh />
          Refresh
        </button>
        <button className="btn btn-outline btn-info mx-1">
          <IconPlus /> Add Context
        </button>
        <CopyToClipboard text={article || ""} onCopy={() => setCopied(true)}>
          <button className="btn btn-outline btn-info mx-1">
            {copied ? <IconCircleCheck /> : <IconCopy />}
            {copied ? "Copied" : "Copy"}
          </button>
        </CopyToClipboard>
      </Group>
    </Container>
  );
};

const ArticleMeta = ({ game }) => {
  const g = game.attributes;

  if (g === undefined) return;
  return (
    <FixturaBox>
      <H size="h6">About this article</H>
      <List
        spacing="xs"
        size="sm"
        center
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCircleCheck size="1rem" />
          </ThemeIcon>
        }
      >
        <List.Item>
          <P>Article created on : {g.createdAt}</P>
        </List.Item>
        <List.Item>
          <P>
            Data for this article was extracted from the following
            <Link
              target="_blank"
              href={`https://www.playhq.com${g.urlToScoreCard}`}
            >
              Scorecard
            </Link>
          </P>
        </List.Item>
      </List>
    </FixturaBox>
  );
};
