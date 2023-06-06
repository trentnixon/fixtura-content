"use client";

import { useState } from "react";

export const DisplayWriteup = ({ game }) => {
  const [writeup, setWriteup] = useState(null);
  console.log(game[0].attributes);

  const assignSelected = (e) => {
    
    setWriteup(game[0].attributes.gtp_3_reports.data[e.target.value]);
  };

  return (
    <div>
      <h1>
        {game[0].attributes.teamHome} vs {game[0].attributes.teamAway}
      </h1>
      {game[0].attributes.gtp_3_reports.data.map((assets, i) => {
        console.log(assets);
        return (
          <button
            key={i}
            value={i}
            className="btn btn-outline btn-info"
            onClick={assignSelected}
          >
            {assets.attributes.asset.data.attributes.Name}
            {assets.attributes.asset.data.id}
          </button>
        );
      })}

      <SelectedWriteup writeup={writeup}/>
    </div>
  );
};

const SelectedWriteup = ({writeup}) => {
    console.log(writeup)
    if(writeup === null)
        return
            return (
                <>
                    <p>
                        {writeup.attributes.article}
                    </p>
                </>
            );
};
