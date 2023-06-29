"use client";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import {
  IconCircleCheck,
  IconCopy,
  IconEdit,
  IconPlus,
  IconRefresh,
  IconCircleDashed,
  IconBook,
} from "@tabler/icons-react";
import { Container, Group, Select, List, ThemeIcon, Grid } from "@mantine/core";
import Link from "next/link";
import { FixturaBox } from "@/components/containers/boxes";
import { FixturaPaper } from "@/components/containers/paper";
import { BackButtonAsNavLink } from "@/components/Navigation/BackBtn";
import { NavLinkWithIcon } from "@/components/UI/buttons";
import { H } from "@/components/Type/Headers";
import { P } from "@/components/Type/Paragraph";
import { FixturaContainer } from "@/components/containers/containers";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const DisplayWriteup = ({ game }) => {
  const [writeup, setWriteup] = useState(null);
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState(null);

  //console.log(game);

  const assignSelected = (id) => { 
    setActive(id);
    setWriteup(game.attributes.gtp_3_reports.data[id]);
  };

  return (
    <FixturaContainer>
      <Grid columns={12}>
        <Grid.Col span={3}>
          <FixturaBox>
            <FixturaPaper>
              {game.attributes.gtp_3_reports.data.map((assets, i) => {
                return (
                  <NavLinkWithIcon
                    active={i === active}
                    key={i}
                    label={assets.attributes.asset.data.attributes.Name}
                    description=""
                    Icon={<IconBook size="2rem" />}
                    onClick={() => {
                      assignSelected(i);
                    }}
                  />
                );
              })}
              <BackButtonAsNavLink />
            </FixturaPaper>
          </FixturaBox>
        </Grid.Col>
        <Grid.Col span={9}>
          <FixturaPaper>
            <H size="h6" align="right">
              {writeup?.attributes === undefined
                ? false
                : writeup?.attributes.asset.data?.attributes.Name}
            </H>
            <SelectedWriteup writeup={writeup} game={game} />

            {writeup === null ? (
              "Select an Article option."
            ) : (
              <ActionBtns
                setCopied={setCopied}
                copied={copied}
                article={writeup?.attributes.article}
              />
            )}

            <ArticleMeta game={game} writeup={writeup} />
          </FixturaPaper>
        </Grid.Col>
      </Grid>
    </FixturaContainer>
  );
};

const SelectedWriteup = ({ writeup, game }) => {
  if (writeup === null) return;
  const g = game.attributes;
  const article = writeup.attributes;
  return (
    <>
      <Container size={`xl`} className=" p-1  my-2">
        <h2 className="font-bold my-1 uppercase text-right ">
          {g.teamHome} vs {g.teamAway}
        </h2>
        <p className="font-light my-1 uppercase text-right ">
          {g.time}
          <br />
          {g.ground}
        </p>
      </Container>
      <FixturaBox>
        <div className="chat chat-start">
          <div className="chat-bubble bg-green-700">
          <ReactMarkdown className="markdown">{article.article}</ReactMarkdown>
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble bg-blue-600">
            Make an edit with the edit button
          </div>
        </div>

        <div className="chat chat-end">
          <div className="chat-bubble bg-blue-600">
            Use the Refresh button to request a full rewrite
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble bg-blue-600">
            Or add extra context to the article that is not avaliable on PlayHQ
          </div>
        </div>
      </FixturaBox>
    </>
  );
};

const ArticleMeta = ({ game, writeup }) => {
  const g = game.attributes;
  const article = writeup?.attributes;
  //console.log(article);
  if (writeup?.attributes === undefined) return;
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
          <P>Article created on : {article.createdAt}</P>
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
