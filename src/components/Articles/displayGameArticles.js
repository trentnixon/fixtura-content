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
} from "@tabler/icons-react";
import { Container, Group, Select, List, ThemeIcon } from "@mantine/core";
import Link from "next/link";

export const DisplayWriteup = ({ game }) => {
  const [writeup, setWriteup] = useState(null);
  const [copied, setCopied] = useState(false);

  const assignSelected = (id) => {
    setWriteup(game.attributes.gtp_3_reports.data[id]);
  };

  const CreateSelect = () => {
    const ARR = [];
    {
      game.attributes.gtp_3_reports.data.map((assets, i) =>
        ARR.push({
          value: i,
          label: assets.attributes.asset.data.attributes.Name,
        })
      );
    }
    return ARR;
  };

  return (
    <>
      <Container size={`xl`} className="navbar bg-base-300 rounded-md">
        <Group position="apart" w={`100%`}>
          <h1>
            {writeup?.attributes === undefined
              ? false
              : writeup?.attributes.asset.data?.attributes.Name}
          </h1>
          <Select
            size={`sm`}
            value={writeup}
            onChange={assignSelected}
            label="Select Article type"
            placeholder="Articles"
            data={CreateSelect()}
            className=" w-72"
          />
        </Group>
      </Container>

      <SelectedWriteup writeup={writeup} game={game} />
      {writeup === null ? (
        ""
      ) : (
        <ActionBtns
          setCopied={setCopied}
          copied={copied}
          article={writeup?.attributes.article}
        />
      )}

      <ArticleMeta game={game} writeup={writeup} />
    </>
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
      <Container size={`xl`} className="border p-1 rounded-md my-2">
        <div className="chat chat-start">
          <div className="chat-bubble bg-green-700">
            <p>{article.article}</p>
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
      </Container>
    </>
  );
};

const ArticleMeta = ({ game, writeup }) => {
  const g = game.attributes;
  const article = writeup?.attributes;
  console.log(article);
  if (writeup?.attributes === undefined) return;
  return (
    <Container size={`xl`} className=" p-1  my-2">
      <h3>About this article</h3>
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
        <List.Item>Article created on : {article.createdAt}</List.Item>
        <List.Item>
          Data for this article was extracted from the following <Link target="_blank" href={`https://www.playhq.com${g.urlToScoreCard}`}>Scorecard</Link>{" "}
        </List.Item>
      </List>
    </Container>
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
