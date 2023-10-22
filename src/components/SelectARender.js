'use client';

import { DateFromTo } from "@/utils/actions";
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';

export const SelectARender = ({ PATH, DATA }) => {
  const router = useRouter();
  const [dateRanges, setDateRanges] = useState([]);

  useEffect(() => {
    setDateRanges(DATA.map(render => DateFromTo(render.attributes.createdAt)));
  }, [DATA]);

  const DirectToRender = (value) => {
    router.push(`${PATH}/${value.target.value}`);
  };

  return (
    <div className="form-control w-full max-w-xs">
      <select className="select select-bordered" onChange={DirectToRender}>
        <option disabled>Date Range</option>
        {DATA.map((render, i) => {
          return (
            <option key={`option_${i}`} id={render.id} value={render.id}>
              {dateRanges[i] || ''}
            </option>
          );
        })}
      </select>
      <label className="label">
        <span className="label-text-alt"> </span>
        <span className="label-text-alt">Select a Date Range</span>
      </label>
    </div>
  );
};
