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

export const DisplayWriteup = ({ game }) => {
  const [writeup, setWriteup] = useState(null);
  const [copied, setCopied] = useState(false);

  const assignSelected = (id) => {
    setWriteup(game[0].attributes.gtp_3_reports.data[id]);
  };

  return (
    <>
      <div className="navbar bg-base-300 rounded-md">
        <div className="flex-1 px-2 lg:flex-none">
          <a className="text-lg font-bold">
            {game[0].attributes.teamHome} vs {game[0].attributes.teamAway}
          </a>
        </div>
        <div className="flex justify-end flex-1 px-2">
          <div className="flex items-stretch">
            <div className="dropdown dropdown-end z-10">
              <label tabIndex={0} className="btn btn-ghost rounded-btn">
                Article Options ({game[0].attributes.gtp_3_reports.data.length})
              </label>
              <ul
                tabIndex={0}
                className="z-10 menu dropdown-content p-2 shadow bg-base-100 rounded-box w-72 mt-4"
              >
                {game[0].attributes.gtp_3_reports.data.map((assets, i) => (
                  <li key={i}>
                    <a onClick={() => assignSelected(i)}>
                      {assets.attributes.asset.data.attributes.Name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <SelectedWriteup writeup={writeup} />
      {writeup === null ? (
        ""
      ) : (
        <ActionBtns
          setCopied={setCopied}
          copied={copied}
          article={writeup?.attributes.article}
        />
      )}
    </>
  );
};

const SelectedWriteup = ({ writeup }) => {
  if (writeup === null) return;
  return (
    <>
      <h2 className="font-bold my-2 uppercase text-right ">
        {writeup.attributes.asset.data.attributes.Name}
      </h2>
      <div className="container border p-1 rounded-md my-2">
        <div className="chat chat-start">
          <div className="chat-bubble bg-green-700">
            <p>{writeup.attributes.article}</p>
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
      </div>
    </>
  );
};

const ActionBtns = ({ setCopied, copied, article }) => {
  return (
    <div className="flex justify-end">
      <div className="join ">
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
      </div>
    </div>
  );
};
